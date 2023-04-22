const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    },
    secure: true,
});