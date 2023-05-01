const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const crypto = require("crypto");
const verificationEmail = require("../utils/verificationEmail");
const { sendCookies } = require("../utils/jwt");

//@desc     Register new user
//@route    POST /auth/register
//@access   Public
const registerUser = async (req, res) => {
  const { name, email } = req.body;

  //create random value for verify email
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({ ...req.body, verificationToken });
  // const token = await user.generateToken();
  const host = "http://localhost:3000";

  await verificationEmail({ name, email, verificationToken, host });

  const payload = { userId: user._id, user: user.name, role: user.role };
  sendCookies(res, payload);

  res.status(201).json({ msg: "registered success", payload });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("verfiy your mail or password");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new Error("verfiy your mail or password");
  }
  if (!user.activated) {
    throw new Error("you must to confirm your eamil");
  }

  const payload = { userId: user._id, user: user.name, role: user.role };
  sendCookies(res, payload);

  res.status(200).json({ msg: "login success", payload });
};

//@desc     get user infos
//@route    GET /users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc     get all user infos
//@route    GET /users/getAll
//@access   Private
const getAll = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// generate token

//@desc    send otp
//@route   POST /users/otp
//@access  Public
const sendOtp = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    cardId,
    role,
    profilePic,
    activated,
    fellowers,
    fellows,
  } = req.body;

  // Make sure that all fields are not empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all the fields");
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("a user with this email already exists try to log in");
  }
  // generate otp
  const otp = Math.floor(100000 + Math.random() * 900000);

  email.sendEmail({
    email: email,
    opt: otp,
    name: name,
  });

  // hash otp
  // const salt = await bcrypt.genSalt(10);
  // const hashedOtp = await bcrypt.hash(otp.toString(), salt);
  // localStorage.setItem("otp", hashedOtp);

  res.status(200).json({
    message: `otp sent to ${email}`,
    otp,
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Verification Failed");
  }

  if (user.verificationToken !== verificationToken) {
    res.status(400);
    throw new Error("Verification Failed");
  }

  user.activated = true;
  user.verificationToken = "";
  await user.save();
  res.status(200).json({ msg: "Email Verified" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAll,
  sendOtp,
  verifyEmail,
};
