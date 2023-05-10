const jwt = require("jsonwebtoken");

const generateToken = (pyload) => {
  return jwt.sign(pyload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const isValidToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const sendCookies = (res, payload) => {
  const token = generateToken(payload);

  // // enrypt token
  // const encryptedToken = crypto
  //   .createCipheriv("aes-256-cbc", process.env.JWT_SECRET, process.env.JWT_SECRET)
  //   .update(token)
  //   .toString("hex");

  res.cookie("token", token, {
    // sameSite: "none",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    httpOnly: true,
    // secure: true,
    // signed: true,
  });
};

module.exports = { sendCookies, isValidToken };
