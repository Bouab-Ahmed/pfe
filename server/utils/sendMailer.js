const nodemailer = require("nodemailer");

const sendMailer = async ({ to, subject, html }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "messaoud.messaoud92@gmail.com",
      pass: "rznkenkudqluxcqq",
    },
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"programming coding <misso@misso.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendMailer;
