// This script defines and exports the PostgreSQL database connection configuration for the application.
// It loads connection parameters from environment variables and reads the SSL certificate from ca.pem.

import fs from "fs";

// Database connection configuration object.
// Reads credentials and SSL CA from environment variables and file system.
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
};

export default config;