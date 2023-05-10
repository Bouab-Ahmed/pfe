const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

// postSchema.methods.addComment = async function (id, body) {
//   const num = this.comments.push({ user: id, body });

//   return this.save();
// };

module.exports = mongoose.model("Comments", commentSchema);
