const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAll,
  sendOtp,
  verifyEmail,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/otp", sendOtp);
router.get("/me", protect, getMe);
router.get("/getAll", getAll);
router.post("/verifyEmail", verifyEmail);

module.exports = router;
