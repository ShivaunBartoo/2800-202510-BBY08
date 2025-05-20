const fs = require("fs");
const express = require("express");
const pg = require("pg");
const dotenv = require('dotenv').config();

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

function isAuthorized(storageId, userId) {
    return new Promise((resolve, reject) => {
        const client = new pg.Client(dbconfig);
        client.connect((err) => {
            if (err) {
                reject(err);
                return;
            }
            auth = client.query(`SELECT storage."ownerId" FROM "storage" WHERE "storageId" = $1 AND "ownerId" = $2`, [storageId, userId], (error, results) => {
                client.end();
                if (error) {
                    reject(error);
                    return;
                }
                
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