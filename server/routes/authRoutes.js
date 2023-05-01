const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyEmail,
  logout,
} = require("../controllers/authControllers");
const { auth } = require("../middleware/authMiddleware");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/verifyEmail").post(auth, verifyEmail);
router.route("/logout").get(logout);

module.exports = router;
