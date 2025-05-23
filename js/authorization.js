// This script provides authorization utilities for the application.
// It includes a function to check if a user is authorized (i.e., is the owner) for a given storage location.
// Uses PostgreSQL for data storage and checks ownership based on storageId and userId.
const fs = require("fs");
const pg = require("pg");

const dbconfig = {
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

/**
 * Checks if the given userId is the owner of the storage with the given storageId.
 * Returns a Promise that resolves to true if authorized, false otherwise.
 */
function isAuthorized(storageId, userId) {
    return new Promise((resolve, reject) => {
        const client = new pg.Client(dbconfig);
        client.connect((err) => {
            if (err) {
                reject(err);
                return;
            }
            // Query the storage table to check if the user is the owner of the storage
            client.query(`SELECT storage."ownerId" FROM "storage" WHERE "storageId" = $1 AND "ownerId" = $2`, [storageId, userId], (error, results) => {
                client.end();
                if (error) {
                    reject(error);
                    return;
                }
                
                // If a row is returned, the user is authorized (is the owner)
                if (results.rowCount > 0){
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    });
}

module.exports = { isAuthorized: isAuthorized };