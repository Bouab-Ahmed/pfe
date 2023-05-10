const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  comment: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  created: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    replies: [ReplySchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
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

module.exports = mongoose.model("Comments", commentSchema);
