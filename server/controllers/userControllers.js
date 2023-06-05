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
  const { id } = req.params; // Get the user id from the parameters
  const updates = req.body; // Get the updates from the request body

  console.log(updates)

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // If updates contain tags, add new tags to the old ones
    if (updates.tags) {
      user.tags = [...user.tags, ...updates.tags];
      delete updates.tags;
    }

    // Update the user with the remaining updates
    Object.assign(user, updates);
    await user.save();

    // If the user id is the logged-in user, update the cookies
    if (req.user._id === id) {
      const payload = { ...user._doc, password: undefined };
      sendCookies(res, payload);
    }

    return res.status(200).send(payload);
  } catch (err) {
    return res.status(500).send(err);
  }
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
  let user = await User.findById({ _id: req.user.userId })
    .populate("tags")
    .select("-password");

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
    userId: _id,
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

  user = { ...updatedUser };
  sendCookies(res, user);

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
