const bcrypt = require("bcrypt");
const saltRounds = 12;
const pg = require("pg");
const fs = require("fs");

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

module.exports = function (app) {
    app.post('/createUser', async (req, res) => {
        let {firstName, lastName, email, password} = JSON.parse(atob(req.body.data));

        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.log("Error connecting to database in /createUser:", err);
                return;
            }
            client.query(`INSERT INTO "users" ("firstName", "lastName", "email", "password") VALUES ($1, $2, $3, $4)`, [firstName, lastName, email, hashedPassword], (error, results) => {
                if (error) {
                    if (firstName == null || lastName == null || email == null || password == null) {
                        console.log("Validation error in /createUser: All fields are required.");
                        return;
                    }
                    console.log("Error inserting user in /createUser:", error);
                    res.send({ status: "fail", msg: "Unable to create user." });
                    return;
                } else {
                    req.session.authenticated = true;
                    req.session.userFirstName = firstName;
                    req.session.lastName = lastName;
                    req.session.email = email;
                    req.session.save(function (err) {
                        if (err) {
                            console.error("Error saving session in /createUser:", err);
                        }
                    });
                    res.send({ status: "success", msg: "Logged in." });
                }
                client.end();
            });
        });
    });

    app.post('/loggingIn', (req, res) => {
        let {email, password} = JSON.parse(atob(req.body.data));

        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.log("Error connecting to database in /loggingIn:", err);
                return;
            }
            client.query(`SELECT * FROM "users" WHERE users.email = $1`, [email], async (error, results) => {

                if (error) {

                    if (results.length <= 0) {
                        res.send({ status: "fail", msg: "User not found" });
                        return;
                    }

                    console.error("Error querying user in /loggingIn:", error);
                    res.send({ status: "fail", msg: "Unable to authenticate" });
                    return;
                }

                let validPassword = await bcrypt.compare(password, results.rows[0].password);

                if (!validPassword) {
                    res.send({ status: 'fail', msg: 'Invalid password' });
                    return;
                }
                req.session.authenticated = true;
                req.session.userId = results.rows[0]["userId"];
                req.session.userFirstName = results.rows[0]["firstName"];
                req.session.lastName = results.rows[0]["lastName"];
                req.session.email = email;
                req.session.save(function (err) {
                    if (err) {
                        console.error("Error saving session in /loggingIn:", err);
                    }
                });
                res.send({ status: "success", msg: "Logged in." });
                client.end();
            });
        });

    });
};