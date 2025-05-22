const express = require("express");
const session = require("express-session");
const fs = require("fs");
const pgSession = require("connect-pg-simple")(session);
const pg = require("pg");
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});


function generateNotifications(storageId) {
  // query all recently added items
  const client = new pg.Client(dbconfig);
  client.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    client.query(
      'SELECT "contentId", "itemName", "quantity" FROM "content" WHERE "storageId" = $1 AND "donatedAt" >= now() - INTERVAL \'1 hour\' AND "contentId" NOT IN (SELECT "contentId" from notifications WHERE emailed = false)',
      [storageId],
      (error, results) => {
        client.end();
        if (error) {
          console.err(error);
          return;
        }

        buildNotifications(storageId, results.rows);
      });
  });
}

function buildNotifications(storageId, items) {
  let sql = 'INSERT INTO "notifications" ("storageId", "contentId", "body") VALUES ';
  let values = [];
  items.forEach((item) => {
    const body = `${item.quantity} ${item.itemName}`;
    let str = "(" + storageId + ", " + item.contentId + ", '" + body + "')";
    values.push(str);
  });
  sql += values + ";";
  const client = new pg.Client(dbconfig);
  client.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }

    client.query(
      sql,
      (error, results) => {
        client.end();
        if (error) {
          console.error(error);
          return;
        }
      });
  });
}

function getPendingNotifications() {
  return new Promise((resolve, reject) => {
    const client = new pg.Client(dbconfig);
    client.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      client.query(
        `SELECT n."storageId", s."title", array_agg(body) AS body, array_agg(n."notificationId") AS notificationIds
                FROM notifications AS n
                JOIN "storage" AS s ON n."storageId" = s."storageId"
                WHERE emailed = false
                GROUP BY n."storageId", s."title";`,
        (error, results) => {
          client.end();

          if (error) {
            reject(error);
            return;
          }
          resolve(results.rows);
        }
      )
    })
  });
}

function getRecipientList(storageId) {
  return new Promise((resolve, reject) => {
    const client = new pg.Client(dbconfig);
    client.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      client.query(
        `SELECT email
                FROM users AS u
                JOIN favourites AS f ON u."userId" = f."userId"
                WHERE u.notifications = true AND f."storageId" = $1;`,
        [storageId],
        (error, results) => {
          client.end();

          if (error) {
            reject(error);
            return;
          }

          resolve(results.rows);
        }
      )
    })
  });
}

function updateNotifications(notificationIds) {
  return new Promise((resolve, reject) => {
    const client = new pg.Client(dbconfig);
    client.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      client.query(
        `UPDATE notifications
                    SET emailed = true
                WHERE "notificationId" IN (${notificationIds.join(', ')});`,
        (error, results) => {
          client.end();

          if (error) {
            reject(error);
            return;
          }

          resolve();
        }
      )
    })
  });
}

function sendNotifications() {

  console.log(`[INFO] ${(new Date()).toUTCString()} - Sending Notifications`);
  let bccList = [];

  getPendingNotifications().then(notifications => {
    notifications.forEach(note => {
      const storageId = note.storageId
      getRecipientList(storageId).then(recipients => {
        recipients.forEach(recipient => {
          bccList.push(recipient.email);
          console.log("\t", recipient.email);
        });

        if (recipients.length > 0) {
          let mailOptions = {
            from: process.env.GMAIL,
            bcc: bccList,
            subject: `A donation has been made to ${note.title}!`,
            html: ` <header><img src="https://res.cloudinary.com/dpepy3t5y/image/upload/v1747847802/becool_solid_wykhpi.png" alt="logo" style="height: 50px; display: flex; margin: 0 auto;"><h1 style="text-align: center;">The following items have been donated:</h1></header>
                        <ul style="text-align: center; list-style: none;">
                            ${note.body.map(x => `<li><h2>${x}</h2></li>`).join('\n')}
                        </ul>
                        <footer style="text-align: center;">If you would like to stop receiving these emails, simply turn off notifications in your profile!</footer>`
                        
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return;
            }
            console.log(info);
            updateNotifications(note.notificationids);
          });
        }
      });
    });
  });
}

module.exports = {
  generateNotifications: generateNotifications,
  sendNotifications: sendNotifications
}