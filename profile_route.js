const bcrypt = require("bcrypt");
const saltRounds = 12;
const pg = require("pg");
const fs = require("fs");
const ejs = require("ejs");
const Joi = require('joi');


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

async function isOwner(req, res, next) {
    const ownerId = req.session.userId;
    if (!ownerId) {
        return res.status(400).json({ error: "owner ID is required" });
    } else {
        next();
    }
}
module.exports = function (app) {

    const updateProfileSchema = Joi.object({
        firstName: Joi.string().regex(/^[a-zA-Z\s'-]{1,50}$/).min(1).max(50).required().messages({
      'string.empty': 'First name is required',
      'string.pattern.base': 'First name can only contain letters, spaces, apostrophes, and hyphens',
      'string.min': 'First name must be at least 1 character',
      'string.max': 'First name cannot exceed 50 characters',
    }),
        lastName: Joi.string().regex(/^[a-zA-Z\s'-]{1,50}$/).min(1).max(50).required().messages({
      'string.empty': 'Last name is required',
      'string.pattern.base': 'Last name can only contain letters, spaces, apostrophes, and hyphens',
      'string.min': 'Last name must be at least 1 character',
      'string.max': 'Last name cannot exceed 50 characters',
    }),
        email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),
        oldPassword: Joi.string().min(4).optional().allow('').messages({
      'string.min': 'Old password must be at least 4 characters',
    }),
        newPassword: Joi.string().min(4).optional().allow('').messages({
      'string.min': 'New password must be at least 4 characters',
    }),
        notifications: Joi.boolean().required()
    });

    app.post('/update-profile', async (req, res) => {
        const { error, value } = updateProfileSchema.validate(req.body, {abortEarly: false});

        if (error) {
            return res.status(400).json({ 
                error: error.details.map(e => e.message),
            fields: error.details.map(e => e.context.key)
            });
        }
        const userId = req.session.userId;
        const { firstName, lastName, email, oldPassword, newPassword, notifications } = value;
        const client = new pg.Client(config);

        try {

            await client.connect();

            const userResult = await client.query(`SELECT * FROM public.users WHERE "userId" = $1`, [userId]);
            const user = userResult.rows[0];

            //if password changedm verify old pass and hash new one

            let newHashedPassword = null;

            if (oldPassword && oldPassword.trim() !== '' && newPassword && newPassword.trim() !== '') {
                const match = await bcrypt.compare(oldPassword, user.password);
                if (!match) {
                    return res.status(400).json({ error: "Old password is incorrect." });
                }
                newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
            }

            // update user info
            const updateFields = [firstName, lastName, email, notifications, userId];
            let query = `UPDATE public.users SET 
                            "firstName" = $1,
                            "lastName" = $2,
                            "email" = $3,
                            "notifications" = $4`;

            if (newHashedPassword) {
                query += `, "password" = '${newHashedPassword}'`;
            }
            query += ` WHERE "userId" = $5 RETURNING*`

            await client.query(query, updateFields);
            res.json({ message: "Profile updated successfully." });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error." });
        } finally {
            await client.end();
        }

    });

    app.get('/ownedstorage', isOwner, async (req, res) => {
        const ownerId = req.session.userId;

        const client = new pg.Client(config);
        try {

            await client.connect();
            const ownedResult = await client.query(`SELECT * FROM public.storage WHERE "ownerId" = $1 AND "deletedDate" IS NULL`, [ownerId]);

            const renderedCards = await Promise.all(
                ownedResult.rows.map((row) => {

                    return ejs.renderFile("views/partials/storage-card.ejs", { row, isAuthenticated: req.session.authenticated, });
                })
            );
            
            res.json(renderedCards);
        } catch (err) {
            console.error("Owned storage Template rendering error:", err);
            res.status(500).json({ error: "Failed to render owned storage templates" });
        } finally {
            client.end();
        }
    });

    app.get('/ownedReview', isOwner, async (req, res) => {
        const ownerId = req.session.userId;
        const client = new pg.Client(config);

        try {
            await client.connect();

            // Get reviews
            const reviewResult = await client.query(
                `SELECT r.*,u.*, s."title" AS storagetitle 
             FROM public.reviews AS r
             JOIN public.users AS u ON r."userId" = u."userId"
             JOIN public.storage AS s ON r."storageId" = s."storageId"
             WHERE r."userId" = $1 AND r."deletedDate" IS NULL
             ORDER BY r."createdAt" DESC`,
                [ownerId]
            );

            const reviewRows = reviewResult.rows;
            const reviewIds = reviewRows.map(r => r.reviewId);

            if (reviewIds.length === 0) {
                return res.json([]);
            }

            // Get replies for those reviews
            const replyResult = await client.query(
                `SELECT *
             FROM public.replies AS rp
             JOIN public.users AS u ON rp."userId" = u."userId"
             WHERE rp."reviewId" = ANY($1) AND rp."deletedDate" IS NULL
             ORDER BY rp."createdAt" ASC`,
                [reviewIds]
            );

            const replies = replyResult.rows;

            // Render all reviews with replies
            const renderedCards = await Promise.all(
                reviewRows.map((review) => {
                    const reviewReplies = replies.filter(reply => reply.reviewId === review.reviewId);
                    return ejs.renderFile("views/partials/review-card.ejs", {
                        row: review,
                        replies: reviewReplies,
                        page: 'profile'
                    });
                })
            );

            res.json(renderedCards);

        } catch (err) {
            console.error("Error in /ownedReview:", err);
            res.status(500).json({ error: "Server error" });
        } finally {
            client.end();
        }
    });

};