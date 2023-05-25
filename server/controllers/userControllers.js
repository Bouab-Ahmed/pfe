const User = require("../models/userModel");
const Tag = require("../models/tagModel");
const { StatusCodes } = require("http-status-codes");
const { sendCookies } = require("../utils/jwt");
const { BadRequestError } = require("../errors");

const getAllUsers = async (req, res) => {
  const user = await User.find().select("-password");
  res.status(StatusCodes.OK).json({ user });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
    .select("-password")
    .populate({
      path: "tags",
      select: "name _id",
    });

  if (!user) {
    throw new BadRequestError("user not found");
  }

  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequestError("put name and password");
  }
  // const user = await User.findByIdAndUpdate({ _id: req.user.userId }, { name, email }, { new: true, runValidators: true })
  const user = await User.findById({ _id: req.user.userId });
  user.name = name;
  user.email = email;
  await user.save();
  const payload = { userId: user._id, user: user.name, role: user.role };
  sendCookies(res, payload);
  res.status(StatusCodes.OK).json({ msg: "update user", payload });
};

const setCurrentUser = async (req, res) => {
  const user = await User.findById({ _id: req.user.userId })
    .populate("tags")
    .select("-password");
  res.status(StatusCodes.OK).json(user);
};

const removeUser = async (req, res) => {
  res.status(StatusCodes.OK).json("remove user");
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Error("please put values");
  }

  const user = await User.findById({ _id: req.user.userId });
  const checkPassword = await user.comparePassword(oldPassword);

  if (!checkPassword) {
    throw new Error("invalid password");
  }

  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "password updated successfully" });
};

const addTag = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  user.tags.push(req.params.id);
  user.save();
  const payload = { userId: user._id, ...user._doc };
  sendCookies(res, payload);
  res.status(StatusCodes.OK).json(user);
};

const addFollow = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  user.following.push(req.params.id);
  const user2 = await User.findOne({ _id: req.params.id }).select("-password");
  user2.follower.push(req.user.userId);
  await user.save();
  await user2.save();
  const payload = { userId: user._id, ...user._doc };
  sendCookies(res, payload);
  res.status(StatusCodes.OK).json(user);
};

module.exports = {
  getAllUsers,
  updateUser,
  updatePassword,
  removeUser,
  getSingleUser,
  setCurrentUser,
  addTag,
  addFollow,
};
