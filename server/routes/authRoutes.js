const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyEmail,
  logout,
} = require("../controllers/authControllers");
const { auth } = require("../middleware/authMiddleware");
const { uploadProductImageLocal } = require("../controllers/uploadsController");

router.route("/login").post(loginUser);
router.route("/upload").post(uploadProductImageLocal);
router.route("/register").post(registerUser);
router.route("/verifyEmail").post(auth, verifyEmail);
router.route("/logout").post(logout);

module.exports = router;
