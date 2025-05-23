/**
 * @file api.js
 * @description
 * Main Express API routes and database logic for the application.
 * Handles storage browsing, content management, reviews, notifications, authentication, and classification endpoints.
 * Integrates with PostgreSQL, Cloudinary, and various utility modules.
 */

const { getDistance } = require("../userLocation");
const { classify } = require("../food-classify");
const fs = require("fs");
const pg = require("pg");
const ejs = require("ejs");
const cloudinary = require("cloudinary").v2;
const Joi = require('joi');

const notificationUtils = require('../notification-emails');

// Cloudinary configuration for image uploads
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

// PostgreSQL connection configuration
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

module.exports = function (app) {

    /**
     * GET /api/browse
     * Returns a list of storage locations, sorted and filtered by user favourites and location.
     * Renders each storage as an HTML card using EJS partials.
     */
    app.get("/api/browse", async (req, res) => {
        const client = new pg.Client(config);
        try {
            await client.connect();

            const storageResults = await client.query(`SELECT s.*,
            (SELECT MAX(c."donatedAt") > (Now() - interval '24 hours')
            FROM public.content AS c
            WHERE c."storageId" = s."storageId"
            ) AS restocked,
            (SELECT AVG(r."rating")::numeric(10,1) 
            FROM public.reviews AS r
            Where r."storageId" = s."storageId")
            FROM public.storage AS s
            WHERE s."deletedDate" IS NULL`);

            let favoriteIds = [];
            // Get user's favourite storage IDs
            const favResults = await client.query('SELECT "storageId" FROM public.favourites WHERE "userId" = $1', [
                req.session.userId,
            ]);
            favoriteIds = favResults.rows.map((row) => row.storageId);

            const lat = parseFloat(req.query.lat);
            const lon = parseFloat(req.query.lon);
            const radius = req.query.radiusFilter === "none" || isNaN(parseFloat(req.query.radiusFilter))
                ? null
                : parseFloat(req.query.radiusFilter);

            // Render each storage card as HTML using EJS
            let renderedCards = await Promise.all(
                storageResults.rows.map((row) => {
                    let distance = getDistance(lat, lon, parseFloat(row.coordinates.x), parseFloat(row.coordinates.y));
                    distance = distance.toFixed(1);
                    const isFavourite = favoriteIds.includes(row.storageId);

                    // Filter out cards outside the radius unless they are favourites
                    if (radius !== null && !isFavourite && distance > radius) return null;
                    return ejs
                        .renderFile("views/partials/storage-card.ejs", {
                            row,
                            distance,
                            isFavourite,
                            isAuthenticated: req.session.authenticated,
                        })
                        .then((html) => ({
                            html,
                            isFavourite,
                            distance,
                        }));
                })
            );

            renderedCards = renderedCards.filter(card => card !== null);

            // Sort cards: favourites first, then by distance
            let sortByDistance = (arr) => arr.sort((a, b) => a.distance - b.distance);
            let favouriteCards = sortByDistance(renderedCards.filter((card) => card.isFavourite));
            let nonFavouriteCards = sortByDistance(renderedCards.filter((card) => !card.isFavourite));
            let allCards = [...favouriteCards, ...nonFavouriteCards];
            allCards = allCards.map((card) => card.html);
            res.json(allCards);
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "Failed to fetch data" });
        } finally {
            await client.end();
        }
    });

    /**
     * GET /api/contents/:id
     * Returns the contents of a specific storage location as rendered HTML rows.
     */
    app.get("/api/contents/:id", (req, res) => {
        let storageID = req.params.id;
        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.error('Fail to connect to the database', err);
                return;
            }
            client.query(
                `
                SELECT 
                c."contentId", c."itemName", c."quantity", to_char(c."bbd", 'Mon dd, yyyy') AS bbd
                FROM public.content AS c
                WHERE c."storageId" = $1`,
                [storageID],
                async (error, results) => {
                    if (error) {
                        console.error('Fail to retrieve content information: ', error);
                        client.end();
                        return;
                    }
                    // Render each content row as HTML using EJS
                    const renderedRows = await Promise.all(
                        results.rows.map((row) => {
                            return ejs.renderFile("views/partials/content-rows.ejs", { row });
                        })
                    );

                    res.json(renderedRows);
                    client.end();
                }
            );
        });
    });

    /**
     * POST /api/donate
     * Adds donated items to a storage location after validating input.
     * Triggers notification generation for the storage.
     */
    app.post("/api/donate", (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO "content" ("storageId", "itemName", "quantity", "bbd") VALUES ';
        let items = [];
        let storageId;
        for (let i = 0; i < data.length; i++) {
            let info = data[i];
            storageId = info.storageId;
            let str = "(" + info.storageId + ", '" + info.itemName + "', " + info.quantity + ", '" + info.bbd + "')";
            items.push(str);
        }
        sql += items + ";";

        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.error('fail to connect to DB: ', err);
                return;
            }
            client.query(sql, (error) => {
                if (error) {
                    console.error('fail to query database to donate items: ', error);
                    client.end();
                    res.send({ status: "fail", msg: "Unable to add item to DB" });
                } else {

                    // add notifications
                    notificationUtils.generateNotifications(storageId);

                    res.send({ status: "success", msg: "Item added to DB" })
                }
                client.end();
            });
        });
    });

    /**
     * POST /api/take
     * Updates or deletes content items from a storage location based on user action.
     * Handles both quantity updates and deletions in the database.
     */
    app.post("/api/take", async (req, res) => {
        let data = req.body;
        let deleteList = [];
        let updateList = [];
        let failure = false;
        // Separate items to update and delete
        data.forEach(item => {
            if (typeof item.id !== 'number' || typeof item.qty !== 'number') {
                failure = true;
                return;
            }
            if (item.qty == 0) {
                deleteList.push(item);
            } else {
                updateList.push(item);
            }
        })
        if (failure) {
            res.send({ status: "fail", msg: "Unable to remove items from DB" });
            return;
        }

        // SQL for updating and deleting items
        let updateSql = 'UPDATE "content" AS c SET "quantity" = d.qty FROM (VALUES ' + updateList.map(d => { return `(${d.id}, ${d.qty})` }).join(', ') + ') as d(id, qty) WHERE d.id = c."contentId"';

        let deleteSql = 'WITH c_deleted AS (DELETE FROM "content" WHERE "contentId" IN (' + deleteList.map(d => { return `${d.id}` }).join(', ') + '))' + 'DELETE FROM notifications WHERE "contentId" IN (' + deleteList.map(d => { return `${d.id}` }).join(', ') + ')';

        const queryPromises = [];

        // Update items if needed
        queryPromises.push(new Promise((resolve, reject) => {
            if (updateList.length > 0) {
                const client = new pg.Client(config);
                client.connect((err) => {
                    if (err) {
                        reject(err);
                    }
                    client.query(updateSql, (error) => {
                        if (error) {
                            reject(err);
                        }

                        resolve();
                        client.end();
                    });
                });
            } else {
                resolve();
            }
        }));

        // Delete items if needed
        queryPromises.push(new Promise((resolve, reject) => {
            if (deleteList.length > 0) {
                const client = new pg.Client(config);
                client.connect((err) => {
                    if (err) {
                        reject(err);
                    }
                    client.query(deleteSql, (error) => {
                        if (error) {
                            reject(err);
                        }
                        resolve();
                        client.end();
                    });
                })
            } else {
                resolve();
            }
        }));

        Promise.all(queryPromises)
            .then(() => {
                res.send({ status: "success", msg: "Database successfully updated" });
            })
            .catch(err => {
                console.error('fail to query database when taking items: ', err);
                res.send({ status: "fail", msg: "Unable to remove items" });
            });
    });

    /**
     * GET /api/reviews/:storageId
     * Returns all reviews for a given storage location, rendered as HTML.
     * Also fetches and attaches replies to each review.
     */
    app.get('/api/reviews/:storageId', (req, res) => {
        const { storageId } = req.params;
        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.error('fail to connect to DB', err);
                return res.status(500).send("DB connection error");
            }

            client.query(
                `SELECT * 
                FROM public.reviews AS r
                JOIN public.users AS u ON r."userId" = u."userId"
                WHERE r."storageId" = $1 
                AND r."deletedDate" IS NULL 
                ORDER BY r."createdAt" DESC
                `, [storageId],
                async (error, results) => {
                    if (error) {
                        console.error('query error for getting reviews: ',error);
                        client.end();
                        return res.status(500).send("Query error");
                    }

                    // Fetch all replies for reviews
                    const replies = await client.query(
                        `SELECT * 
                        FROM public.replies AS r
                        JOIN public.users AS u ON r."userId" = u."userId"
                        AND r."deletedDate" IS NULL 
                        ORDER BY r."createdAt" DESC`
                    )
                    try {
                        // Render each review card as HTML using EJS, attaching replies
                        const renderedCards = await Promise.all(
                            results.rows.map((row) => {
                                const reviewReplies = replies.rows.filter(reply => reply.reviewId == row.reviewId);

                                return ejs.renderFile("views/partials/review-card.ejs", { row, replies: reviewReplies, page: 'reviews', currentUser: req.session.userId });
                            }
                            )
                        );

                        res.send(renderedCards.join("")); // Send HTML string
                    } catch (err) {
                        console.error("Template rendering error:", err);
                        res.status(500).send("Template rendering error");
                    } finally {
                        client.end();
                    }
                }
            )
        });
    });

    /**
     * GET /api/fridgePoint
     * Returns all storage locations as points for mapping (lat/lon).
     */
    app.get('/api/fridgePoint', (req, res) => {

        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.error('get fridge point error: ', err);
                return;
            }
            client.query("SELECT * FROM public.storage", async (error, results) => {
                if (error) {
                    console.error('Fail to get storage information from database: ', error);
                    client.end();
                    return;
                }
                // Map storage rows to lat/lon point objects
                const points = results.rows.map(row => ({
                    id: row.storageId,
                    name: row.title,
                    lat: parseFloat(row.coordinates.x),
                    lon: parseFloat(row.coordinates.y)
                }));

                res.json(points);
                client.end();
            });
        });
    });

    /**
     * GET /storageloc/:id
     * Returns the latitude and longitude of a specific storage location.
     */
    app.get("/storageloc/:id", async (req, res) => {
        const storageId = req.params.id;
        const client = new pg.Client(config);
        await client.connect();
        const seperate = await client.query(
            `
SELECT CAST(coordinates[0] AS FLOAT) AS latitude, CAST(coordinates[1] AS FLOAT) AS longitude
FROM storage WHERE "storageId" = $1`,
            [storageId]);

        res.json(seperate.rows[0]);
        client.end();

    });

    /**
     * GET /gmapkey
     * Returns the Google Maps API key for client-side use.
     */
    app.get("/gmapkey", (req, res) => {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        res.json({ apiKey })
    });

    /**
     * POST /api/favourite
     * Adds or removes a storage location from the user's favourites.
     * Requires authentication.
     */
    app.post("/api/favourite", async (req, res) => {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const id = req.body.id;
        const client = new pg.Client(config);
        await client.connect();

        // Check if already a favourite
        const favResults = await client.query(
            'SELECT "storageId" FROM public.favourites WHERE "userId" = $1 AND "storageId" = $2',
            [req.session.userId, id]
        );
        let favoriteIds = [];
        favoriteIds = favResults.rows.map((row) => row.storageId);

        if (favoriteIds.includes(Number(id))) {
            // If already favourite, remove from favourites
            await client.query('DELETE FROM public.favourites WHERE "userId" = $1 AND "storageId" = $2', [
                req.session.userId,
                id,
            ]);
        } else {
            // If not favourite, add to favourites
            await client.query('INSERT INTO public.favourites ("userId", "storageId") VALUES ($1, $2)', [
                req.session.userId,
                id,
            ]);
        }
        res.status(200).send();
        client.end();
    });

    /**
     * GET /api/classify
     * Classifies an input string as food or not food using the classify utility.
     * Query parameter: input (string to classify, URI encoded)
     */
    app.get("/api/classify", async (req, res) => {
        const input = req.query.input;
        const response = await classify(input);
        res.send(response);
    });

    /**
     * GET /api/session
     * Returns the current session's authentication status and user ID.
     */
    app.get("/api/session", (req, res) => {
        if (req.session && req.session.userId) {
            res.status(200).json({ loggedIn: true, userId: req.session.userId });
        } else {
            res.status(200).json({ loggedIn: false });
        }
    });

};
