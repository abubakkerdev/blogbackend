const nodemailer = require("nodemailer");

async function emailSend(userMail, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abubakkerdev@gmail.com",
      pass: "rhrmbsnmzogfidkq",
    },
  });

  const info = await transporter.sendMail({
    from: 'Blog site email send', // sender address
    to: userMail, // list of receivers
    subject: "Hello ✔", // Subject line
    html: `<h2>https://blogfrontend123.netlify.app/api/v1/backend/auth/tokencheck/${token}</h2>`, // html body
  });
}

module.exports = emailSend;
