const sendMailer = require("./sendMailer");

const verificationEmail = async ({ name, email, verificationToken }) => {
  // const verifyEmail = `${host}/auth/verify?token=${verificationToken}&email=${email}`;

  const message = `<p> your confirmation code is :${verificationToken}</p>`;

  return sendMailer({
    to: email,
    subject: "Email confirmation",
    html: `<h4> Hello, ${name}</h4>${message}`,
  });
};

module.exports = verificationEmail;
