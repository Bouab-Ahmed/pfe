const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add a name"],
    },
    email: {
      type: String,
      required: [true, "Please Add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Add a name"],
    },
    role: {
      type: String,
      enum: ["writer", "reader", "admin"],
      default: "reader",
    },
    fellows: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    fellowers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    cardId: {
      type: String,
      require: [true, "you must to provide cardId"],
    },
    profilePic: {
      type: String,
      default: "/uploads/default.jpg",
    },
    verificationToken: String,
    activated: {
      type: Boolean,
      default: false,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.methods.generateToken = async function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
