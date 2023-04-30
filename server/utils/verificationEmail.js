const sendMailer = require("./sendMailer");

const verificationEmail = async ({ name, email, verificationToken, host }) => {
  const verifyEmail = `${host}/auth/verify?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email click here : <a href="${verifyEmail}">Verify Email</a> </p>`;

  return sendMailer({
    to: email,
    subject: "Email confirmation",
    html: `<h4> Hello, ${name}</h4>${message}`,
  });
};

module.exports = verificationEmail;
