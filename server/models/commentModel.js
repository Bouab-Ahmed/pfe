const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  comment: { type: String, required: true },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "you must to provide user id"],
  },
  created: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "you must to provide a comment"],
    },
    replies: [ReplySchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "you must to provide user id"],
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: [true, "you must to provide post id"],
    },

    //
  },
  { timestamps: true }
);

commentSchema.methods.addReplyComment = async function (id, comment) {
  // const num = this.comments.push({ comment });
  this.replies.push({ user: id, comment });
  return this.save();
};

commentSchema.methods.increseCounters = async function () {
  const user = await this.model("User").findById(this.user);
  user.counter += 1;
  await user.save();
  
};

module.exports = mongoose.model("Comments", commentSchema);
