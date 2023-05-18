const nodemailer = require("nodemailer");

const sendMailer = async ({ to, subject, html }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bouab.ahmed757@gmail.com",
      pass: "loqdsebhesqtpclt",
    },
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: 'Knowledge Hub <bouab.ahmed757@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendMailer;
