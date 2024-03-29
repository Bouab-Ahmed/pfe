const User = require("../models/userModel");

const crypto = require("crypto");
const verificationEmail = require("../utils/verificationEmail");
const { sendCookies } = require("../utils/jwt");
const { uploadProductImageLocal } = require("./uploadsController");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

/***********register User*********************/

const registerUser = async (req, res) => {
  const pathImg = await uploadProductImageLocal(req);
  const { name, email } = req.body;
  //create random value for verify email
  // const verificationToken = crypto.randomBytes(40).toString("hex");
  const verificationToken = Math.floor(100000 + Math.random() * 900000);
  const user = await User.create({
    ...req.body,
    verificationToken,
    cardId: pathImg,
  });
  // const token = await user.generateToken();
  // const host = "http://localhost:3000";
  // generate verification email code of 6 degits
  await verificationEmail({ name, email, verificationToken });
  const payload = { userId: user._id, user: user.name, role: user.role };
  sendCookies(res, payload);
  res.status(StatusCodes.OK).json({ msg: "registered success", payload });
};

/***********login User*********************/

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  // disable-eslint-next-line
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.BadRequestError("verfiy your mail or password");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.BadRequestError("verfiy your mail or password");
  }
  if (!user.activated) {
    throw new CustomError.BadRequestError("you must to confirm your eamil");
  }

  if (!user.accepted) {
    throw new CustomError.BadRequestError(
      "wait till the admin accept your account"
    );
  }

  // const payload = { userId: user._id, user: user.name, role: user.role, };
  const payload = { userId: user._id, ...user._doc };
  sendCookies(res, payload);
  res.status(StatusCodes.OK).json({ msg: "login success", payload });
};

/***********verfiy email*********************/

const verifyEmail = async (req, res) => {
  const { token } = req.body;
  console.log(req.body);
  const user = await User.findById({ _id: req.user.userId });

  if (!token) {
    throw CustomError.BadRequestError("you must provide verification token");
  }

  if (!user) {
    throw new CustomError.BadRequestError("Verification Failed");
  }

  if (user.verificationToken !== token) {
    throw new CustomError.BadRequestError(
      "your account is already verified or invalid token"
    );
  }

  user.activated = true;
  user.verificationToken = "";
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

/***********logout*********************/

const logout = async (req, res) => {
  res.cookie("token", "logout", { expires: new Date(Date.now()) });
  res.status(StatusCodes.OK).json({ msg: "logout success" });
};

module.exports = { registerUser, loginUser, verifyEmail, logout };
