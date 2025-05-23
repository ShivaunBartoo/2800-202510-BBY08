// This script provides API endpoints for creating, updating, and soft-deleting storage locations (fridges/pantries).
// It handles image uploads (with Cloudinary), address geocoding, and input validation using Joi.
// The script supports both creation and management (edit/delete) of storage locations.

const fs = require("fs");
const pg = require("pg");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const upload = multer({ storage: multer.memoryStorage() });
const Joi = require("joi");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const config = ({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
    }
});

// Geocodes a full address using Google Maps API and returns latitude/longitude.
async function geocodeAddress(fullAddress) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const encoded = encodeURIComponent(fullAddress);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        return {
            lat: location.lat,
            lng: location.lng,
        };
    } else {
        throw new Error('Geocoding failed: ' + data.status);
    }
}

const { uploadPhotoCloud } = require('../utils');

module.exports = function (app) {

    // Joi schema for validating storage creation/edit fields
    const storageSchema = Joi.object({
        title: Joi.string().regex(/[$\(\)<>]/, { invert: true }).max(50).required().messages({
            'string.empty': 'Name of the storage is required',
            'string.pattern.invert.base': 'Field contains invalid characters like $, (), or <>',
        }),

        storageType: Joi.string().valid("1", "2").required(),
        street: Joi.string().regex(/[$\(\)<>]/, { invert: true }).max(50).required().messages({
            'string.empty': 'Street is required',
            'string.pattern.invert.base': 'Field contains invalid characters like $, (), or <>',
        }),
        city: Joi.string().regex(/[$\(\)<>]/, { invert: true }).max(50).required().messages({
            'string.empty': 'City is required',
            'string.pattern.invert.base': 'Field contains invalid characters like $, (), or <>',
        }),
        province: Joi.string().regex(/[$\(\)<>]/, { invert: true }).max(50).required().messages({
            'string.empty': 'Province is required',
            'string.pattern.invert.base': 'Field contains invalid characters like $, (), or <>',
        }),
        lastCleaned: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
            .optional()
            .allow(""),
        description: Joi.string().regex(/[$\(\)<>]/, { invert: true }).max(1000).optional().allow("")
    });

    // Joi schema for validating storageId for deletion
    const deleteSchema = Joi.object({
        storageId: Joi.number().integer().required()
    });

    // Route: PUT /manage/storage
    // Updates an existing storage location (fridge/pantry) with new data and/or image.
    // Handles geocoding, image upload, and input validation.
    app.put('/manage/storage', upload.single('photo'), async (req, res) => {
        const { storageId } = req.query;
        const { title, storageType, street, city, province, lastCleaned, description } = req.body;

        const { error } = storageSchema.validate({ title, storageType, street, city, province, lastCleaned, description }, {abortEarly : false});
        if (error) return res.status(400).json({ 
            error: error.details.map(e => e.message),
            fields: error.details.map(e => e.context.key) });

        if (!storageId) return res.status(400).json({ error: 'Storage ID is required' });

        const address = `${street}, ${city}, ${province}, Canada`;

        const coords = await geocodeAddress(address);

        if (!storageId) {
            return res.status(400).json({ error: 'Storage ID is required' });
        }

        const client = new pg.Client(config);

        try {
            await client.connect();

            let image = null;
            let imgPublicId = null;

            if (req.file) {
                // If a new image is uploaded, delete the old image from Cloudinary
                const existing = await client.query(
                    `SELECT "imgPublicId" FROM public.storage WHERE "storageId" = $1`,
                    [storageId]
                );
                const oldPublicId = existing.rows[0]?.imgPublicId;

                const cloudResult = await uploadPhotoCloud(req.file.buffer, oldPublicId, 'storage_img');

                image = cloudResult.image;
                imgPublicId = cloudResult.imgPublicId;
            } else {
                // If no new image, keep the existing image and public ID
                const existing = await client.query(
                    `SELECT "image", "imgPublicId" FROM public.storage WHERE "storageId" = $1`,
                    [storageId]
                );
                image = existing.rows[0]?.image || null;
                imgPublicId = existing.rows[0]?.imgPublicId || null;
            }

            const cleanedDate = lastCleaned?.trim() ? `${lastCleaned}:00` : null;

            const result = await client.query(
                `UPDATE public.storage
                 SET "title" = $1,
                     "storageType" = $2,
                     "street" = $3,
                     "city" = $4,
                     "province" = $5,
                     "lastCleaned" = $6,
                     "image" = $7,
                     "imgPublicId" = $8,
                     "description" = $9,
                     "coordinates" = POINT($10, $11)
                 WHERE "storageId" = $12
                 RETURNING *`,
                [title, storageType, street, city, province, cleanedDate, image, imgPublicId, description, coords.lat, coords.lng, storageId]
            );

            res.status(200).json(result.rows[0]);

        } catch (err) {
            console.error('Update error:', err);
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            await client.end();
        }
    });

    // Route: DELETE /manage/storage/soft-delete
    // Soft-deletes a storage location by setting its deletedDate to the current date.
    app.delete("/manage/storage/soft-delete", async (req, res) => {
        const { storageId } = req.query;

        const { error } = deleteSchema.validate({ storageId: Number(storageId) });
        if (error) return res.status(400).json({ error: error.details.map(e => e.message) });

        if (!storageId) {
            return res.status(400).json({ error: "Storage ID is required" });
        }
        const client = new pg.Client(config);

        try {
            await client.connect();

            const result = await client.query(
                `UPDATE public.storage 
                     SET "deletedDate" = CURRENT_DATE 
                     WHERE "storageId" = $1 
                     RETURNING *`,
                [storageId]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Storage not found" });
            }

            res.json({ message: "Storage soft-deleted", storage: result.rows[0] });
        } catch (error) {
            console.error("Error soft-deleting storage:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await client.end();
        }
    });

    // Route: POST /storage/createnew
    // Creates a new storage location (fridge/pantry) with provided data and optional image.
    // Handles geocoding, image upload, and input validation.
    app.post('/storage/createnew', upload.single('photo'), async (req, res) => {

        const ownerId = req.session.userId;
        if (!ownerId) {
            return res.status(400).json({ error: "userID is required" });
        }

        let { storageType, title, street, city, province, description } = req.body;

        title = title?.trim();
        street = street?.trim();
        city = city?.trim();
        province = province?.trim();
        description = description?.trim();

        const { error } = storageSchema.validate({ title, storageType, street, city, province, description }, {abortEarly: false});
        if (error) return res.status(400).json({
            error: error.details.map(e => e.message),
            fields: error.details.map(e => e.context.key)
        });

        const address = `${street}, ${city}, ${province}, Canada`;

        const coords = await geocodeAddress(address);

        const client = new pg.Client(config);

        try {

            await client.connect();

            let image = null;
            let imgPublicId = null;

            if (req.file) {
                // Upload new image to Cloudinary
                const cloudResult = await uploadPhotoCloud(req.file.buffer, null, 'storage_img');

                image = cloudResult.image;
                imgPublicId = cloudResult.imgPublicId;
            }
            const createData = await client.query(
                `INSERT INTO public.storage ("storageType", "title", "street", 
                "city", "ownerId", "province", "description", "coordinates","image",
                     "imgPublicId") 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, POINT($8, $9), $10, $11) 
                        RETURNING *`,
                [storageType, title, street, city, ownerId, province, description, coords.lat, coords.lng, image, imgPublicId]
            );

            if (createData.rows.length === 0) {
                return res.status(404).json({ error: "Storage not created" });
            }

            res.json({ message: "Storage created", storage: createData.rows[0] });

        } catch (error) {
            console.error("Error creating storage:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await client.end();
        }

    });

};
