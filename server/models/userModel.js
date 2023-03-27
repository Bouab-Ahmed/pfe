const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please Add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please Add a name'],
    },
    role: {
      type: String,
      enum: ['writer', 'reader', 'admin'],
      default: 'reader',
    },
    fellows: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    fellowers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    cardId: {
      type: String,
      required: [true, 'Please upload you id card'],
    },
    profilePic: {
      type: String,
      default: '../public/assets/default.jpg',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
