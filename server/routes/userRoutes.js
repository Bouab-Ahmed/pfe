const express = require('express');
const router = express.Router();
const {
  sendOtpCode,
  registerUser,
  loginUser,
  getMe,
  getAll,
} = require('../controllers/userControllers');
const protect = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/otp', sendOtpCode);
router.get('/me', protect, getMe);
router.get('/getAll', getAll);

module.exports = router;
