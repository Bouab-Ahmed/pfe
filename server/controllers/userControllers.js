const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//@desc     Register new user
//@route    POST /auth/register
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cardId } = req.body;

  // Make sure that all fields are not empty
  if (!name || !email || !password || !cardId) {
    res.status(400);
    throw new Error('please add all the fields');
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('a user with this email already exists');
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    cardId,
  });

  if (user) {
    res.status(201).json({
      message: `user created successfully`,
      _id: user.id,
      name: user.name,
      email: user.email,
      cardId: user.cardId,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
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
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
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

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAll,
};
