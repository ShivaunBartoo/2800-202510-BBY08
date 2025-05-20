const bcrypt = require("bcrypt");
const saltRounds = 12;
const pg = require("pg");
const fs = require("fs");
const ejs = require("ejs");

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

async function isOwner (req, res, next) {
    const ownerId = req.session.userId;
        if (!ownerId) {
            return res.status(400).json({ error: "owner ID is required" });
        } else {
            next();
        }
}
module.exports = function (app) {

    app.post('/update-profile', async (req, res) => {

        const userId = req.session.userId;
        const { firstName, lastName, email, oldPassword, newPassword, notifications } = req.body;
        const client = new pg.Client(config);

        try {

            await client.connect();

            const userResult = await client.query(`SELECT * FROM public.users WHERE "userId" = $1`, [userId]);
            const user = userResult.rows[0];

            //if password changedm verify old pass and hash new one

            let newHashedPassword = null;

            if (oldPassword && newPassword) {
                const match = await bcrypt.compare(oldPassword, user.password);
                if (!match) {
                    return res.status(400).json({ message: "Old password is incorrect." });
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

            const result = await client.query(query, updateFields);
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
            const ownedResult = await client.query(`SELECT * FROM public.storage WHERE "ownerId" = $1`, [ownerId]);

            const renderedCards = await Promise.all(
                ownedResult.rows.map((row) => {

                    return ejs.renderFile("views/partials/storage-card.ejs", { row });
                })
            );
            // Send the array of rendered HTML
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
            const ownedResult = await client.query(`SELECT * FROM public.reviews WHERE "userId" = $1`, [ownerId]);
            
            const renderedCards = await Promise.all(
                ownedResult.rows.map((row) => {

                    return ejs.renderFile("views/partials/review-card.ejs", { row });
                })
            );

            // Send the array of rendered HTML
            res.json(renderedCards);
            
        } catch (err) {
            console.error(" Review template rendering error:", err);
            res.status(500).json({ error: "Failed to render review templates" });
        } finally {
            client.end();
        }
    });
    
};