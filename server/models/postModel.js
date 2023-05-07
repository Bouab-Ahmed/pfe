const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: { type: String, required: [true, "you must to put a comment"] },
  created: { type: Date, default: Date.now },
});

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
      default: "/uploads/default.jpg",
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    content: {
      type: String,
    },
    content: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

postSchema.methods.addComment = function (id, body) {
  this.comments.push({ user: id, body });
  return this.save();
};

postSchema.methods.removeComment = function (id) {
  const comment = this.comments.id(id);

  if (!comment) {
    throw new NotFoundError("not found any comment ");
  }
  comment.remove();
  return this.save();
};

module.exports = mongoose.model("Post", postSchema);
