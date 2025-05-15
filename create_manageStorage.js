const bcrypt = require("bcrypt");
const fs = require("fs");
const pg = require("pg");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const saltRounds = 12;

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

async function uploadPhotoCloud(fileBuffer, oldPublicId = null, folder = 'default_folder') {
    try {
        if (oldPublicId) {
            await cloudinary.uploader.destroy(oldPublicId);
        }

        const cloudResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder }, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }).end(fileBuffer);
        });

        return {
            image: cloudResult.secure_url,
            imgPublicId: cloudResult.public_id
        };
    } catch (err) {
        throw new Error('Cloudinary upload failed: ' + err.message);
    }
}

module.exports = function (app) {

    
    app.put('/manage/storage', upload.single('photo'), async (req, res) => {
        const { storageId } = req.query;
        const { title, storageType, street, city, province, lastCleaned, description } = req.body;

        const address = `${street}, ${city}, ${province}, Canada`;

        const coords = await geocodeAddress(address);
        console.log(coords);

        if (!storageId) {
            return res.status(400).json({ error: 'Storage ID is required' });
        }

        const client = new pg.Client(config);

        try {
            await client.connect();

            let image = null;
            let imgPublicId = null;

            if (req.file) {

                // Delete old image
                const existing = await client.query(
                    `SELECT "imgPublicId" FROM public.storage WHERE "storageId" = $1`,
                    [storageId]
                );
                const oldPublicId = existing.rows[0]?.imgPublicId;

                const cloudResult = await uploadPhotoCloud(req.file.buffer, oldPublicId, 'storage_img');
                console.log('cloud result', cloudResult);

                image = cloudResult.image;
                imgPublicId = cloudResult.imgPublicId;
            } else {
                // Keep existing image
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

            console.log('server', result.rows[0]);
        } catch (err) {
            console.error('Update error:', err);
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            await client.end();
        }
    });

    app.delete("/manage/storage/soft-delete", async (req, res) => {
        const { storageId } = req.query;

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




    app.post('/storage/createnew', upload.single('photo'), async (req, res) => {
        // const ownerId = req.session.userId;
        const ownerId = '1';
        if (!ownerId) {
            return res.status(400).json({ error: "userID is required" });
        }

        const { storageType, title, street, city, province, description } = req.body;
        const address = `${street}, ${city}, ${province}, Canada`;

        const coords = await geocodeAddress(address);
        console.log(coords);

        const client = new pg.Client(config);

        try {

            await client.connect();

            let image = null;
            let imgPublicId = null;

            if (req.file) {

                const cloudResult = await uploadPhotoCloud(req.file.buffer, oldPublicId = null, 'storage_img');
                console.log('cloud result', cloudResult);

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
            console.log('new storage', createData.rows[0]);

        } catch (error) {
            console.error("Error creating storage:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await client.end();
        }

    });

};
