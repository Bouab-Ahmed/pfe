const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  sendOtp,
  verifyEmail,
  logout,
} = require("../controllers/authControllers");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/otp").post(sendOtp);
router.route("/verifyEmail").post(verifyEmail);
router.route("/logout").get(logout);

module.exports = router;
