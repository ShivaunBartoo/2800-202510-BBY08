const express = require("express");
const session = require("express-session");
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
    pass: GMAIL_PASSWORD
  }
});

var mailOptions = {
  from: process.env.GMAIL,
  to: req.session.email,
  subject: 'A donation has been made!',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = function (app) {
    app.post('/createNotification', (req, res) => {
        
    })
};