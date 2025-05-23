// This script is the main entry point for the Express web server.
// It sets up middleware, session management, static file serving, and all main application routes.
// The script handles rendering of all major pages, user authentication, authorization, and integrates with other route modules.

const { getYourCity } = require("./js/city.js");
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const fs = require("fs");
const pg = require("pg");

const notificationUtils = require("./notification-emails");
const authorization = require("./authorization.js");

const app = express();
const port = process.env.PORT || 3000;

// Database connection configuration
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

const pgPool = new pg.Pool(config);

// Periodically send notifications using the notification utility
setInterval(() => {
    notificationUtils.sendNotifications();
}, process.env.NOTIF_INTERVAL_IN_MINUTES * 60 * 1000)

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files for JS, CSS, and images
app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/img", express.static(__dirname + "/img"));

// Configure session management with PostgreSQL session store
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: new pgSession({
            pool: pgPool,
            tableName: "sessions",
        }),
        resave: false,
        saveUninitialized: true,
    })
);

// Make session available in all templates via res.locals
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Route: GET /
// Landing page. Redirects authenticated users to /browse, otherwise renders index page.
app.get("/", function (req, res) {
    if (req.session.authenticated) {
        res.redirect("/browse");
    } else {
        res.render("index", {
            stylesheets: ["index.css"],
            scripts: [],
        });
    }
});

// Route: GET /createAccount
// Renders the account creation page.
app.get("/createAccount", function (req, res) {
    res.render("create_account", {
        stylesheets: ["login.css"],
        scripts: ["authentication-client.js"],
    });
});

// Route: GET /about
// Renders the about page.
app.get("/about", function (req, res) {
    res.render("about", {
        stylesheets: ["about.css"],
        scripts: [],
    });
});

// Route: GET /login
// Renders the login page.
app.get("/login", function (req, res) {
    res.render("login", {
        stylesheets: ["login.css"],
        scripts: ["authentication-client.js"],
    });
});

// Route: GET /browse
// Renders the browse page, showing storage locations and city info.
app.get("/browse", async function (req, res) {
    const { lat, lon } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const city = await getYourCity(lat, lon, process.env.GOOGLE_MAPS_API_KEY);
    res.render("browse", {
        city,
        stylesheets: ["browse.css"],
        scripts: [],
        apiKey,
    });
});

// Route: GET /contents/:id
// Renders the contents page for a specific storage location.
app.get("/contents/:id", function (req, res) {
    let css = ["contents.css", "contents-modal.css"];
    let js = ["contents.js", "locational.js"];
    let other = [
        `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`,
        `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`,
    ];
    let storageID = req.params.id;
    let userId = req.session.userId;
    const client = new pg.Client(config);
    client.connect((err) => {
        if (err) {
            console.error('Cannot connect to contents page', err);
            return;
        }
        client.query(
            `
                    SELECT s."storageType", s."title", s."lastCleaned", s."ownerId" = $2 AS "isCurrentUserOwner" 
                    FROM public.storage AS s 
                    WHERE s."storageId" = $1`,
            [storageID, userId],
            (error, results) => {
                if (error) {
                    console.error('Cannot connect to database', err);
                    client.end();
                    return;
                }
                let type = results.rows[0].storageType;
                let title = results.rows[0].title;
                let lastCleaned = results.rows[0].lastCleaned;
                let authorized = results.rows[0].isCurrentUserOwner;
                res.render("contents", {
                    type: type,
                    title: title,
                    lastCleaned: lastCleaned,
                    stylesheets: css,
                    scripts: js,
                    other: other,
                    id: storageID,
                    auth: authorized,
                });
                client.end();
            }
        );
    });
});

// Route: GET /map/:id
// Renders the map page for a specific storage location.
app.get("/map/:id", function (req, res) {
    let storageID = req.params.id;
    authorization.isAuthorized(storageID, req.session.userId).then(auth => {
        res.render("map", {
            stylesheets: ["contents.css", "contents-modal.css", "map.css"],
            scripts: ["locational.js"],
            id: storageID,
            auth: auth,
        });
    })
});

// Route: GET /directions
// Serves the static directions HTML page.
app.get("/directions", function (req, res) {
    let doc = fs.readFileSync("./html/directions.html", "utf8");
    res.send(doc);
});

// Route: GET /manage/:id
// Renders the manage page for a specific storage location, only if the user is authorized (owner).
app.get("/manage/:id", (req, res) => {
    const storageId = req.params.id;
    authorization.isAuthorized(storageId, req.session.userId).then(auth => {
        if (!auth) {
            res.redirect("/login");
            return;
        }
        if (!storageId) {
            return res.status(400).json({ error: "Storage ID is required" });
        }
        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.error('Cannot connect to manage page', err);
            }
            client.query(
                `SELECT * FROM public.storage WHERE "storageId" = $1 AND "deletedDate" IS NULL`,
                [storageId], (error, results) => {
                    client.end();
                    if (error) {
                        console.error('Cannot connect to database', err);

                    }
                    if (results.rows.length === 0) {
                        return res.status(404).json({ error: "Storage not found" });
                    }
                    const storage = results.rows[0];

                    if (storage.lastCleaned) {
                        storage.lastCleaned = new Date(storage.lastCleaned);
                    }
                    res.render("manage", {
                        storage,
                        stylesheets: ["contents.css", "manage.css"],
                        scripts: ["imageUploadUtil.js", "manage.js"],
                        id: storageId,
                        auth: auth,
                    });
                }
            );
        });
    });
});

// Route: GET /profile
// Renders the profile page for the currently logged-in user.
app.get("/profile", async function (req, res) {
    let {lat, lon} = req.query;
    if (!lat || !lon) {
        lat = null;
        lon = null;
    }

    const userId = req.session.userId;
    if (!userId) {
        return res.redirect("/login");
    }

    const client = new pg.Client(config);
    try {
        await client.connect();


        const result = await client.query(
            `SELECT * FROM public.users WHERE "userId" = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "user not found" });
        }

        const userInfo = result.rows[0];

        res.render("profile", {
            lat,
            lon,
            userInfo,
            stylesheets: ["browse.css", "reviews.css", "profile.css"],
            scripts: ["profile.js"],
        });
    } catch (error) {
        console.error("Error fetching storage:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await client.end();
    }
});

// Route: GET /storage/createnew
// Renders the page for creating a new fridge or pantry.
app.get("/storage/createnew", (req, res) => {
    res.render("create_new", {
        stylesheets: ["create_new.css"],
        scripts: ["imageUploadUtil.js", "create_new.js"],
    });
});

/// Route: GET /reviews/:storageId
// Renders the reviews page for a specific storage location.
app.get("/reviews/:storageId", function (req, res) {
    const storageId = req.params.storageId;
    authorization.isAuthorized(storageId, req.session.userId).then(auth => {
        res.render("reviews", {
            stylesheets: ["reviews.css", "contents.css", "addreview.css"],
            scripts: ["reviews.js"],
            other: [
                `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`,
                `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`,
            ],
            id: storageId,
            auth: auth, 
        });
    });
});

// Logout user and destroys current session
app.get("/logout", function (req, res) {
    if (req.session) {
        req.session.destroy(function (error) {
            if (error) {
                res.status(500).send("Unable to log out");
            } else {
                res.redirect("/");
            }
        });
    }
});

// Register additional API and route modules
require('./api')(app);
require('./authentication')(app);
require('./create_manageStorage')(app);
require('./profile_route')(app);
require('./review_reply')(app);

// Catch-all route for 404 Page Not Found
app.use(function (req, res) {
    res.status(404).render("404", {
            stylesheets: ["404.css"]
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`[INFO] ${(new Date()).toUTCString()} - Server is running on http://localhost:${port}`);
});