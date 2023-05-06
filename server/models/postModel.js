const mongoose = require("mongoose");

const postSChema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    // user id, title, content, image, likes(like, dislike), comments, createdAt, tags
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSChema);
