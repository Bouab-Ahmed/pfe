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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
