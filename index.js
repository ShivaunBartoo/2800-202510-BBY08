const express = require("express");
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require("bcrypt");
const fs = require("fs");
const pg = require("pg");
const dotenv = require('dotenv').config();

const ejs = require("ejs");

const saltRounds = 12;
const app = express();
const port = process.env.PORT || 3000;

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
    }
}

const pgPool = new pg.Pool(config);

app.set('view engine', 'ejs');


// Isabel code
// client.connect()
//     .then(()=> console.log("connected to postgrs"))
//     .catch(err => console.error("oopsie", err.stack));
//

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/img", express.static(__dirname + "/img"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new pgSession({
        pool: pgPool,
        tableName: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}));



// Route for landing page pre-login
app.get("/", function (req, res) {
    if (session.authenticated) {
        res.redirect("/browse");
    }
    else {
        res.render("index", {
            stylesheets: ["index.css"],
            scripts: [],
        });
    }
})

// Route for landing page pre-login
app.get("/createAccount", function (req, res) {
    let doc = fs.readFileSync("./html/create_account.html", "utf8");
    res.send(doc);
})

// Route for about page
app.get("/about", function (req, res) {
    let doc = fs.readFileSync("./html/about.html", "utf8");
    res.send(doc);
})

// Route for login page
app.get("/login", function (req, res) {
    let doc = fs.readFileSync("./html/login.html", "utf8");
    res.send(doc);
})

// Route for browse page
app.get("/browse", function (req, res) {
    res.render("browse", {
        stylesheets: ["browse.css"],
        scripts: [],
    });
})

// Route for contents page
app.get("/contents/:id", function (req, res) {
    let css = ["contents.css", "contents-modal.css"];
    let js = ["contents.js", "locational.js"];
    let other = [`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`, `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`]
    let storageID = req.params.id;
    const client = new pg.Client(config);
    client.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        client.query(`
                    SELECT s."storageType", s."title", s."lastCleaned" 
                    FROM public.storage AS s 
                    WHERE s."storageId" = $1`, [storageID], async (error, results) => {
            if (error) {
                console.log(error);
                client.end();
                return;
            }
            let type = results.rows[0].storageType;
            let title = results.rows[0].title;
            let lastCleaned = results.rows[0].lastCleaned;
            res.render("contents", { type: type, title: title, lastCleaned: lastCleaned, stylesheets: css, scripts: js, other: other });
        });
    })

})

// Route for directions page
app.get("/directions", function (req, res) {
    let doc = fs.readFileSync("./html/directions.html", "utf8");
    res.send(doc);
})

// Route for manage page
app.get("/manage", function (req, res) {
    let doc = fs.readFileSync("./html/manage.html", "utf8");
    res.send(doc);
})


// Route for profile page
app.get("/profile", function (req, res) {
    let doc = fs.readFileSync("./html/profile.html", "utf8");
    res.send(doc);
})

// Route for view your fridges page
app.get("/view-own", function (req, res) {
    let doc = fs.readFileSync("./html/view_own.html", "utf8");
    res.send(doc);
})

// Route for create new fridge/pantry page
app.get("/new", function (req, res) {
    let doc = fs.readFileSync("./html/create_new.html", "utf8");
    res.send(doc);
})

///route for reviews
app.get("/reviews/:storageId", function (req, res) {
    const storageId  = req.params.storageId;
    res.render("reviews", {
        stylesheets: ["reviews.css", "contents.css", "addreview.css"],
        scripts: ["reviews.js"],
        other: [`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`, `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`]
    });
});

app.post('/reviews/:storageId', async (req, res) => {
    const userId = req.session.userId;
    //if (!userId) return res.status(401).send('Not logged in');

    const storageId = req.params.storageId;
    const { title, body, rating } = req.body;
    //const photo = req.file ? `/uploads/${req.file.filename}` : null;
    const client = new pg.Client(config);

    client.connect((err) => {

        if (err) {
            console.log(err);
            return;
        } 
        client.query(`
        INSERT INTO public.reviews 
       ("userId", "storageId", "title", "body", "rating")
        VALUES ($1, $2, $3, $4, $5)
      `, [userId, storageId, title, body, rating], (err, results) => {
            if (err) {
                console.log(err);
                return;
            } 
            res.redirect(`/reviews/${storageId}`);
            client.end();
        });
        
    });
    
});

app.post("/replies", async (req, res) => {
    console.log(req.session);
    const userId = req.session.userId;
    console.log(userId);
    console.log("Received body:", req.body);
    const { reviewId, reply} = req.body;

    // const renderedHTML = await ejs.renderFile("views/reviews.ejs", { storageId });

    const client = new pg.Client(config);
    client.connect();

    try {
        await client.query(`
        INSERT INTO public.replies 
       ("userId", "reviewId", "body")
        VALUES ($1, $2, $3)
      `, [userId, reviewId, reply]);
        res.send(redirect);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving reply");
    } finally {
        await client.end();
    }
});

// Logout user and destroys current session
app.post("/logout", function (req, res) {
    if (req.session) {
        req.session.destroy(function (error) {
            if (error) {
                res.status(500).send("Unable to log out")
            } else {
                res.redirect("/");
            }
        });
    }
});

require('./api')(app);
require('./authentication')(app);


// Page not found
app.use(function (req, res, next) {
    let doc = fs.readFileSync("./html/404.html", "utf8");
    res.status(404).send(doc);
    next();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});