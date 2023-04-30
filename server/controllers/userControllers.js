const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const email = require("../config/email");

//@desc     Register new user
//@route    POST /auth/register
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
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

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  let user;
  user = await User.create({
    name,
    email,
    password: hashedPassword,
    cardId,
    role,
    profilePic,
    activated,
    fellowers,
    fellows,
  });

  if (user) {
    res.status(201).json({
      message: `user created successfully`,
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      profilePic: user.profilePic,
      cardId: user.cardId,
      activated: user.activated,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     authenticate user
//@route    POST /users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: `user found`,
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      profilePic: user.profilePic,
      cardId: user.cardId,
      activated: user.activated,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

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

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAll,
  sendOtp,
};
