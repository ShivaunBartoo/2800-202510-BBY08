// This script provides API endpoints for creating, replying to, and deleting reviews and replies for storage locations.
// It handles image uploads for reviews and replies, input validation, and manages related Cloudinary images and database records.

const fs = require("fs");
const pg = require("pg");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = require('cloudinary').v2;
const Joi = require("joi");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
    },
};
const { uploadPhotoCloud } = require('./utils');

module.exports = function (app) {

    // Joi schema for validating review creation fields
    const reviewSchema = Joi.object({
        title: Joi.string().regex(/[$\(\)<>]/, { invert: true }).max(100).required().messages({
      'string.empty': 'Review title is required',
      'string.pattern.invert.base': 'Review title cannot contain characters like $, (, ), <, or >',
      'string.max': 'Review title must not exceed 100 characters',
      'any.required': 'Review title is required',
    }),
        body: Joi.string().regex(/[$\(\)<>]/, { invert: true }).max(1000).required().messages({
      'string.empty': 'Review body is required',
      'string.pattern.invert.base': 'Review body cannot contain characters like $, (, ), <, or >',
      'string.max': 'Review body must not exceed 1000 characters',
      'any.required': 'Review body is required',
    }),
        rating: Joi.number().integer().min(1).max(5).required().messages({
      'number.base': 'Rating must be a number',
      'number.integer': 'Rating must be a whole number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot be more than 5',
      'any.required': 'Rating is required',
    }),
    });

    // Joi schema for validating reply creation fields
    const replySchema = Joi.object({
        reviewId: Joi.number().integer().required(),
        reply: Joi.string().regex(/[$\(\)<>]/, { invert: true }).max(1000).required().messages({
      'string.empty': 'Reply body is required',
      'string.pattern.invert.base': 'Reply body cannot contain characters like $, (, ), <, or >',
      'string.max': 'Reply body must not exceed 1000 characters',
      'any.required': 'Reply body is required',
        }),
    });

    // Route: POST /reviews/:storageId
    // Creates a new review for a storage location, with optional image upload.
    app.post("/reviews/:storageId", upload.single('photo'), async (req, res) => {
        const userId = req.session.userId;
        const storageId = req.params.storageId;

        const { title, body, rating } = JSON.parse(req.body.review);

        const { error } = reviewSchema.validate({ title, body, rating });
        if (error) {
            return res.status(400).json({
                error: error.details.map(e => e.message),
            fields: error.details.map(e => e.context.key) 
        });
        }

        const client = new pg.Client(config);

        client.connect((err) => {
            if (err) {
                console.error('Cannot connect to reviews', err);
                return;
            }
            // If an image is uploaded, upload to Cloudinary first
            if (req.file) {
                uploadPhotoCloud(req.file.buffer, null, 'review_img')
                    .then(cloudResult => {

                        insertReview(cloudResult.image, cloudResult.imgPublicId);
                    })
                    .catch(err => {
                        console.error("Image upload error:", err);
                        res.status(500).send("Image upload failed");
                    });
            } else {
                insertReview(null);
            }
            // Helper function to insert the review into the database
            function insertReview(imageUrl, publicId) {
                client.query(
                    `
        INSERT INTO public.reviews 
       ( "userId", "storageId", "title", "body", "rating", "photo", "imgPublicId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
                    [userId, storageId, title, body, rating, imageUrl, publicId],
                    (err) => {
                        if (err) {
                            console.error('Cannot connect to database', err);
                            client.end();
                            return;
                        }
                        res.redirect(`/reviews/${storageId}`);
                        client.end();
                    }
                );
            }
        });
    });

    // Route: POST /replies
    // Creates a new reply to a review, with optional image upload.
    app.post("/replies", upload.single('photo'), async (req, res) => {

        const userId = req.session.userId;
        const { error } = replySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { reviewId, reply } = req.body;

        const file = req.file;

        const client = new pg.Client(config);

        try {
            await client.connect();

            let image = null;
            let imgPublicId = null;

            if (file) {
                // Upload reply image to Cloudinary if provided
                const cloudResult = await uploadPhotoCloud(file.buffer, null, 'review_img');

                image = cloudResult.image;
                imgPublicId = cloudResult.imgPublicId;
            }
            await client.query(
                `
        INSERT INTO public.replies 
       ("userId", "reviewId", "body", "photo", "imgPublicId")
        VALUES ($1, $2, $3, $4, $5)
      `,
                [userId, reviewId, reply, image, imgPublicId]
            );
        } catch (err) {
            console.error(err);
            res.status(500).send("Error saving reply");
        }
        res.send("Reply added to database.");
        client.end();
    });

    // Route: DELETE /replies/:id
    // Deletes a reply by its ID, and removes its image from Cloudinary if present.
    app.delete('/replies/:id', async (req, res) => {
        const replyId = req.params.id;
        const client = new pg.Client(config);

        try {
            await client.connect();

            const { rows } = await client.query(
                `SELECT "imgPublicId" FROM public.replies WHERE "replyId" = $1 AND "deletedDate" IS NULL`,
                [replyId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Reply not found' })
            };

            const imgPublicId = rows[0].imgPublicId;

            // delete the reply
            await client.query(
                `DELETE FROM public.replies WHERE "replyId" = $1`,
                [replyId]
            );

            // Delete image from Cloudinary if exists
            if (imgPublicId) {
                await cloudinary.uploader.destroy(imgPublicId);
            }

            res.sendStatus(200);
        } catch (err) {
            console.error('Failed to delete reply:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            await client.end();
        }

    });

    // Route: DELETE /reviews/:id
    // Deletes a review and all its replies by review ID, and removes all related images from Cloudinary.
    app.delete('/reviews/:id', async (req, res) => {
        const reviewId = req.params.id;

        if (!reviewId) {
            return res.status(400).json({ error: 'Invalid review ID' });

        }

        const client = new pg.Client(config);
        try {
            await client.connect();

            await client.query(`BEGIN`);

            // fetch all image public IDs for replies
            const repliesResult = await client.query(
                `SELECT "imgPublicId" FROM public.replies WHERE "reviewId" = $1 AND "imgPublicId" IS NOT NULL`,
                [reviewId]
            );

            // fetch image public ID for the review itself
            const reviewResult = await client.query(
                `SELECT "imgPublicId" FROM public.reviews WHERE "reviewId" = $1 AND "imgPublicId" IS NOT NULL`,
                [reviewId]
            );

            const imagePublicIds = [
                ...repliesResult.rows.map(row => row.imgPublicId),
                ...reviewResult.rows.map(row => row.imgPublicId),
            ].filter(Boolean); // Ensure no nulls

            // delete all images from Cloudinary
            const deletionPromises = imagePublicIds.map(publicId => cloudinary.uploader.destroy(publicId));
            await Promise.all(deletionPromises);

            // delete replies and review
            await client.query(
                `DELETE FROM public.replies WHERE "reviewId" = $1`,
                [reviewId]
            );

            const deleteReviewResult = await client.query(
                `DELETE FROM public.reviews WHERE "reviewId" = $1`,
                [reviewId]
            );

            await client.query(`COMMIT`);

            if (deleteReviewResult.rowCount === 0) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.status(200).json({ message: 'Review, replies, and images deleted.' });
        } catch (err) {
            await client.query(`ROLLBACK`);
            console.error('Error during deletion:', err);
            res.status(500).json({ error: 'Failed to delete review and related data.' });
        } finally {
            client.end();
        }
    });

};
