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
        firstName: Joi.string().regex(/^[a-zA-Z\s'-]{1,50}$/).min(1).max(50).required().messages({
      'string.empty': 'First name is required',
      'string.pattern.base': 'First name can only include letters, spaces, hyphens, and apostrophes',
      'string.min': 'First name must be at least 1 character long',
      'string.max': 'First name cannot exceed 50 characters',
      'any.required': 'First name is required',
    }),
        lastName: Joi.string().regex(/^[a-zA-Z\s'-]{1,50}$/).min(1).max(50).required().messages({
      'string.empty': 'Last name is required',
      'string.pattern.base': 'Last name can only include letters, spaces, hyphens, and apostrophes',
      'string.min': 'Last name must be at least 1 character long',
      'string.max': 'Last name cannot exceed 50 characters',
      'any.required': 'Last name is required',
    }),
        email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
        password: Joi.string().min(4).max(128).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 4 characters',
      'string.max': 'Password cannot exceed 128 characters',
      'any.required': 'Password is required',
    }),
    });

    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
        password: Joi.string().min(4).max(128).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 4 characters',
      'string.max': 'Password cannot exceed 128 characters',
      'any.required': 'Password is required',
    })
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
                console.error("Error connecting to database in /createUser:", err);
                return;
            }
            client.query(`INSERT INTO "users" ("firstName", "lastName", "email", "password") VALUES ($1, $2, $3, $4) RETURNING "userId"`, [firstName, lastName, email, hashedPassword], (error, results) => {
                if (error) {
                    if (firstName == null || lastName == null || email == null || password == null) {
                        console.error("Validation error in /createUser: All fields are required.");
                        return;
                    }
                    console.error("Error inserting user in /createUser:", error);
                    res.send({ status: "fail", msg: "Unable to create user." });
                    return;
                } else {
                    req.session.userId = results.rows[0].userId;
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
                console.error("Error connecting to database in /loggingIn:", err);
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