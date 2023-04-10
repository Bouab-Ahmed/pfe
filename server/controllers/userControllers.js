const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');



//@desc     Register new user
//@route    POST /auth/register
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cardId, role, profilePic } = req.body;

  // Make sure that all fields are not empty
  if (!name || !email || !password) {
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
  let user;
  if (role === 'writer') {
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      cardId,
      role,
      profilePic,
    });
  } else {
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profilePic,
    });
  }

  if (user) {
    res.status(201).json({
      message: `user created successfully`,
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      profilePic: user.profilePic,
      cardId: user.cardId ? user.cardId : null,
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
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      profilePic: user.profilePic,
      cardId: user.cardId,
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

//desc send otp
//route POST auth/otp
//access Public

const sendOtpCode = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // Generate a secure token and store it on the server-side
  const token = crypto.randomBytes(3).toString('hex');
  // Send the token to the user's email
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: 'OTP for login',
    text: `Your OTP is ${token}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending verification email' });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAll,
  sendOtpCode,
};
