const { NotFoundError } = require("../errors");
const Comments = require("../models/commentModel");

const createNewComment = async (req, res) => {
  req.body.user = req.user.userId;
  req.body.post = req.body.postId;
  const comment = await Comments.create({ ...req.body });

  const commentWithInfoUser = await comment.populate({
    path: "user",
    select: "name profilePic -_id",
  });

  res.status(201).json({ commentWithInfoUser });
};

const getAllCommentofPost = async (req, res) => {
  const comment = await Comments.findById({ _id: req.body.postId });

  if (!comment) {
    throw new NotFoundError("not found any comment ");
  }
  res.status(200).json({ comment });
};

const replyComment = async (req, res) => {
  res.status(200).json("reply comment");
};

const updateComment = async (req, res) => {
  const comment = await Comments.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  if (!comment) {
    throw new NotFoundError("not found any comment ");
  }

  res.status(200).json(comment);
};

const deleteComment = async (req, res) => {
  const comment = await Comments.findOne({ _id: req.params.id });
  if (!comment) {
    throw new NotFoundError("not found any comment ");
  }
  await comment.remove();

  res.status(200).json({ msg: "delete comment success" });
};

module.exports = {
  createNewComment,
  updateComment,
  deleteComment,
  getAllCommentofPost,
  replyComment,
};
