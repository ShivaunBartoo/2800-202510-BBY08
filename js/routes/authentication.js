// This script handles user authentication for the application.
// It provides routes for user registration and login, including validation, password hashing, and session management.
// Uses PostgreSQL for user data storage, bcrypt for password hashing, and Joi for input validation.

const bcrypt = require("bcrypt");
const saltRounds = 12;
const pg = require("pg");
const fs = require("fs");
const Joi = require('joi');

// Database connection configuration
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

    // Joi schema for validating user registration data
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

    // Joi schema for validating login data
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

    // Route: POST /createUser
    // Handles user registration. Validates input, hashes password, inserts user into DB, and starts session.
    app.post('/createUser', async (req, res) => {
        let parsedData;

        try {
            // Decode and parse the base64-encoded JSON data from the request body
            parsedData = JSON.parse(atob(req.body.data));
        } catch {
            return res.status(400).send({ status: "fail", msg: "Invalid data format" });
        }

        // Validate user input using Joi schema
        const { error, value } = userSchema.validate(parsedData);
        if (error) {
            return res.status(400).send({ status: "fail", msg: error.details[0].message });
        }

        const { firstName, lastName, email, password } = value;

        // Hash the user's password before storing
        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        const client = new pg.Client(config);
        client.connect((err) => {
            if (err) {
                console.error("Error connecting to database in /createUser:", err);
                return;
            }
            // Insert new user into the database
            client.query(`INSERT INTO "users" ("firstName", "lastName", "email", "password") VALUES ($1, $2, $3, $4) RETURNING "userId"`, [firstName, lastName, email, hashedPassword], (error, results) => {
                if (error) {
                    // Check for missing fields (should be caught by Joi, but double check)
                    if (firstName == null || lastName == null || email == null || password == null) {
                        console.error("Validation error in /createUser: All fields are required.");
                        return;
                    }
                    console.error("Error inserting user in /createUser:", error);
                    res.send({ status: "fail", msg: "Unable to create user." });
                    return;
                } else {
                    // Set session variables for the new user
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

    // Route: POST /loggingIn
    // Handles user login. Validates input, checks credentials, and starts session if successful.
    app.post('/loggingIn', (req, res) => {
        let parsedData;

        try {
            // Decode and parse the base64-encoded JSON data from the request body
            parsedData = JSON.parse(atob(req.body.data));
        } catch {
            return res.status(400).send({ status: "fail", msg: "Invalid data format" });
        }

        // Validate login input using Joi schema
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
            // Query for user by email
            client.query(`SELECT * FROM "users" WHERE users.email = $1`, [email], async (error, results) => {

                if (error) {

                    // If no user found, send fail message
                    if (results.length <= 0) {
                        res.send({ status: "fail", msg: "User not found" });
                        return;
                    }

                    console.error("Error querying user in /loggingIn:", error);
                    res.send({ status: "fail", msg: "Unable to authenticate" });
                    return;
                }

                // Compare provided password with hashed password in DB
                let validPassword = await bcrypt.compare(password, results.rows[0].password);

                if (!validPassword) {
                    res.send({ status: 'fail', msg: 'Invalid password' });
                    return;
                }
                // Set session variables for the logged-in user
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