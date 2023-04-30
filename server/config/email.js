const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "erg5982@gmail.com",
    pass: "svhbygetosegqqdl",
  },
});

module.exports = {
  sendEmail: async (options) => {
    try {
      let info = await transporter.sendMail({
        from: "erg5982@gmail.com",
        to: options.email,
        subject: "Hello " + options.name + " please verify your email address",
        text: "this is your otp " + options.otp,
      });
      console.log("Message sent: %s", info);
    } catch (err) {
      console.log("error in sending email", err);
    }
  },
};
