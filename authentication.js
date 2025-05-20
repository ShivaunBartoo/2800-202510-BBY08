const bcrypt = require("bcrypt");
const saltRounds = 12;
const pg = require("pg");
const fs = require("fs");
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

module.exports = function (app) {

    const userSchema = Joi.object({
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(128).required()
    });

    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(128).required()
    });

    app.post('/createUser', async (req, res) => {
        let parsedData;

        try {
            parsedData = JSON.parse(atob(req.body.data));
        } catch (err) {
            return res.status(400).send({ status: "fail", msg: "Invalid data format" });
        }

        const { error, value } = userSchema.validate(parsedData);
        if (error) {
            return res.status(400).send({ status: "fail", msg: error.details[0].message });
        }

        const { firstName, lastName, email, password } = value;

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
        let parsedData;

        try {
            parsedData = JSON.parse(atob(req.body.data));
        } catch (err) {
            return res.status(400).send({ status: "fail", msg: "Invalid data format" });
        }

        const { error, value } = loginSchema.validate(parsedData);
        if (error) {
            return res.status(400).send({ status: "fail", msg: error.details[0].message });
        }

        const { email, password } = value;

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