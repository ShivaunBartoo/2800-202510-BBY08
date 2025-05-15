const { getDistance } = require("./js/userLocation");
const fs = require("fs");
const pg = require("pg");
const ejs = require("ejs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
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

module.exports = function (app) {
    app.get("/api/browse", async (req, res) => {
        const client = new pg.Client(config);
        try {
            await client.connect();

            const storageResults = await client.query('SELECT * FROM public.storage WHERE "deletedDate" IS NULL');

            let favoriteIds = [];
            const favResults = await client.query('SELECT "storageId" FROM public.favourites WHERE "userId" = $1', [
                req.session.userId,
            ]);
            favoriteIds = favResults.rows.map((row) => row.storageId);

            const lat = parseFloat(req.query.lat);
            const lon = parseFloat(req.query.lon);

            let renderedCards = await Promise.all(
                storageResults.rows.map((row) => {
                    let distance = getDistance(lat, lon, parseFloat(row.coordinates.x), parseFloat(row.coordinates.y));
                    distance = distance.toFixed(1);
                    const isFavourite = favoriteIds.includes(row.storageId);
                    return ejs
                        .renderFile("views/partials/storage-card.ejs", {
                            row,
                            distance,
                            isFavourite,
                        })
                        .then((html) => ({
                            html,
                            isFavourite,
                            distance,
                        }));
                })
            );
            //sort the cards by favourite/non-favourite, and then sort the sublists by distance.
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

    app.get("/api/contents/:id", (req, res) => {
        let storageID = req.params.id;
        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.log(err);
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
                        console.log(error);
                        client.end();
                        return;
                    }
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

    app.post('/api/donate', (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO "content" ("storageId", "itemName", "quantity", "bbd") VALUES ';
        let items = [];
        for (let i = 0; i < data.length; i++) {
            let info = data[i];
            let str = "(" + info.storageId + ", '" + info.itemName + "', " + info.quantity + ", '" + info.bbd + "')";
            items.push(str);
        }
        sql += items + ";";

        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.log(err);
                return;
            }
            client.query(sql, (error, results) => {
                if (error) {
                    console.log(error);
                    res.send({ status: "fail", msg: "Unable to add item to DB" })
                } else {
                    res.send({ status: "success", msg: "Item added to DB" })
                }
                client.end();
            });

        });
    });

    app.post("/api/take", async (req, res) => {
        let data = req.body;
        let deleteList = [];
        let updateList = [];
        let failure = false;
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

        let updateSql = 'UPDATE "content" AS c SET "quantity" = d.qty FROM (VALUES ' + updateList.map(d => { return `(${d.id}, ${d.qty})` }).join(', ') + ') as d(id, qty) WHERE d.id = c."contentId"';

        let deleteSql = 'DELETE FROM "content" WHERE "contentId" IN (' + deleteList.map(d => { return `${d.id}` }).join(', ') + ')';

        const queryPromises = [];

        queryPromises.push(new Promise((resolve, reject) => {
            if (updateList.length > 0) {
                const client = new pg.Client(config);
                client.connect((err) => {
                    if (err) {
                        reject(err);
                    }
                    client.query(updateSql, (error, results) => {
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

        queryPromises.push(new Promise((resolve, reject) => {
            if (deleteList.length > 0) {
                const client = new pg.Client(config);
                client.connect((err) => {
                    if (err) {
                        reject(err);
                    }
                    client.query(deleteSql, (error, results) => {
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
            .catch(err =>{
                console.log(err);
                res.send({ status:"fail", msg: "Unable to remove items"});
            });
    });

    app.get('/api/reviews/:storageId', (req, res) => {
        const { storageId } = req.params;
        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.error(err);
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
                        console.error(error);
                        return res.status(500).send("Query error");
                    }

                    const replies = await client.query(
                        `SELECT * 
                        FROM public.replies AS r
                        JOIN public.users AS u ON r."userId" = u."userId"
                        AND r."deletedDate" IS NULL 
                        ORDER BY r."createdAt" DESC`
                    ) 
                    try {
                        const renderedCards = await Promise.all(
                            results.rows.map((row) =>
                                {
                                    const reviewReplies = replies.rows.filter(reply => reply.reviewId == row.reviewId);
                                    
                                    return ejs.renderFile("views/partials/review-card.ejs", { row, replies: reviewReplies });
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

    app.get("/gmapkey", (req, res) => {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        res.json({ apiKey })
    });

    app.post("/api/favourite", async (req, res) => {
        const id = req.body.id;
        const client = new pg.Client(config);
        await client.connect();

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
    });
};
