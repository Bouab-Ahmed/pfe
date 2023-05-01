const User = require("../models/userModel");

const crypto = require("crypto");
const verificationEmail = require("../utils/verificationEmail");
const { sendCookies } = require("../utils/jwt");

/***********register User*********************/

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

/***********sendOtp*********************/
const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;

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

  email.sendEmail({ email: email, opt: otp, name: name });

  res.status(200).json({
    message: `otp sent to ${email}`,
    otp,
  });
};

/***********verfiy email*********************/
const verifyEmail = async (req, res) => {
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
};

/***********logout*********************/

const logout = async (req, res) => {
  res.cookie("token", "logout", { expires: new Date(Date.now()) });
  res.status(StatusCodes.OK).json({ msg: "logout success" });
};

module.exports = { registerUser, loginUser, sendOtp, verifyEmail, logout };
