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

// var mailOptions = {
//   from: process.env.GMAIL,
//   to: req.session.email,
//   subject: 'A donation has been made!',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

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

  getPendingNotifications().then(notifications => {
    notifications.forEach(note => {
      const storageId = note.storageId
      getRecipientList(storageId).then(recipients => {
        recipients.forEach(recipient => {
          console.log("\t", recipient.email);
        });

        if (recipients.length > 0) {
          let mailOptions = {
            from: process.env.GMAIL,
            bcc: recipients,
            subject: `A donation has been made to ${note.title}!`,
            html: ` <h1>The following items have been donated:</h1>
                        <ul>
                            ${note.body.map(x => `<li>${x}</li>`).join('\n')}
                        </ul>`
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