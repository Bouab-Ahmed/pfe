const jwt = require("jsonwebtoken");
const { isValidToken } = require("../utils/jwt");

const auth = async (req, res, next) => {
  // const token = req.signedCookies.token // here must to active signed:true in cookie
  const { token } = req.cookies;

  if (!token) {
    throw new Error("authenticated invalid");
  }

  try {
    const payload = isValidToken(token);

    req.user = { ...payload };
    next();
  } catch (error) {
    throw new Error("authenticated invalid");
  }
};

module.exports = { auth };
