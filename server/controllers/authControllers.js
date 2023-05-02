const User = require("../models/userModel");

const crypto = require("crypto");
const verificationEmail = require("../utils/verificationEmail");
const { sendCookies } = require("../utils/jwt");

/***********register User*********************/

const registerUser = async (req, res) => {
  // add all data from req.body to user
  const { name, email } = req.body;

  //create random value for verify email
  // const verificationToken = crypto.randomBytes(40).toString("hex");
  const verificationToken = Math.floor(100000 + Math.random() * 900000);

  const user = await User.create({ ...req.body, verificationToken });
  // const token = await user.generateToken();
  // const host = "http://localhost:3000";

  // generate verification email code of 6 degits

  await verificationEmail({ name, email, verificationToken });

  const payload = { userId: user._id, user: user.name, role: user.role };
  sendCookies(res, payload);

  res.status(201).json({ msg: "registered success", payload });
};

/***********login User*********************/

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

/***********verfiy email*********************/
const verifyEmail = async (req, res) => {
  const { token } = req.body;

  const user = await User.findById({ _id: req.user.userId });

  if (!token) {
    throw new Error("you must provide verification token");
  }

  if (!user) {
    throw new Error("Verification Failed");
  }

  if (user.verificationToken !== token) {
    throw new Error("your account is already verified or invalid token");
  }

  user.activated = true;
  user.verificationToken = "";
  await user.save();
  res.status(200).json({ msg: "Email Verified" });
};

/***********logout*********************/

const logout = async (req, res) => {
  res.cookie("token", "logout", { expires: new Date(Date.now()) });
  res.status(StatusCodes.OK).json({ msg: "logout success" });
};

module.exports = { registerUser, loginUser, verifyEmail, logout };
