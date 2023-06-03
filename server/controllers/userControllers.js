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
  const updates = req.body;
  const userId = req.params.id;

  let user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (updates.tags) {
    user.tags.push(...updates.tags);
  } else {
    user = await User.findByIdAndUpdate(userId, updates, {new: true})
  }

  await user.save();

  const {
    _id,
    name,
    email,
    role,
    follower,
    following,
    profilePic,
    activated,
    accepted,
    tags,
    counter,
    bio,
  } = user;

  const updatedUser = {
    _id,
    name,
    email,
    role,
    follower,
    following,
    profilePic,
    activated,
    accepted,
    tags,
    counter,
    bio,
  };

  const payload = { ...updatedUser };
  sendCookies(res, payload);

  res.status(StatusCodes.OK).json(payload);
};

const activateUser = async (req, res) => {
  const { accepted } = req.body;
  if (!accepted) {
    throw new BadRequestError("some thing wrrong");
  }

  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { accepted },
    { new: true, runValidators: true }
  );
  // const user = await User.findById({ _id: req.user.userId });

  res.status(StatusCodes.OK).json({ msg: "activated" });
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
  // Check if the tag already exists in the user's tags array
  if (user.tags.includes(req.params.id)) {
    // Throw an error if the tag already exists
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Tag already exists" });
  }
  user.tags.push(req.params.id);
  user.save();
  const payload = { userId: user._id, ...user._doc };
  sendCookies(res, payload);
  res.status(StatusCodes.OK).json(user);
};

const addFollow = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  user.following.push(req.params.id);
  console.log(user);

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
  activateUser,
};
