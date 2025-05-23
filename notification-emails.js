// This script manages notification emails for the application.
// It generates notifications when new items are donated, stores them in the database, and sends email alerts to users who have favourited a storage location and enabled notifications.
// Uses PostgreSQL for notification storage and nodemailer for sending emails.

const fs = require("fs");
const pg = require("pg");
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

/**
 * Generates notifications for all recently donated items at a storage location.
 * Inserts new notification records for items donated in the last hour that have not yet triggered an email.
 */
function generateNotifications(storageId) {
  // query all recently added items
  const client = new pg.Client(dbconfig);
  client.connect((err) => {
    if (err) {
      console.error(err);
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

/**
 * Inserts notification records into the notifications table for each donated item.
 */
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
      console.error(err);
      return;
    }

    client.query(
      sql,
      (error) => {
        client.end();
        if (error) {
          console.error(error);
          return;
        }
      });
  });
}

/**
 * Retrieves all pending (unsent) notifications, grouped by storage location.
 * Returns a promise that resolves to an array of notification objects.
 */
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

/**
 * Retrieves the list of user emails who have favourited a storage location and enabled notifications.
 * Returns a promise that resolves to an array of recipient objects.
 */
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

/**
 * Marks the given notification IDs as emailed in the database.
 * Returns a promise that resolves when the update is complete.
 */
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
        (error) => {
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

/**
 * Sends notification emails for all pending notifications.
 * For each storage location with new donations, sends a single email to all recipients who have favourited that location.
 * After sending, marks the notifications as emailed.
 */
function sendNotifications() {

  console.log(`[INFO] ${(new Date()).toUTCString()} - Sending Notifications`);
  let bccList = [];
  getPendingNotifications().then(notifications => {
    notifications.forEach(note => {
      const storageId = note.storageId
      getRecipientList(storageId).then(recipients => {
        recipients.forEach(recipient => {
          bccList.push(recipient.email);
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

          // Send the email to all recipients in the bccList
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.error(error);
              return;
            }
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