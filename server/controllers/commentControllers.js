const { NotFoundError } = require("../errors");
const Comments = require("../models/commentModel");

const createNewComment = async (req, res) => {
  req.body.user = req.user.userId;
  req.body.post = req.body.postId;
  const post = await Comments.findById({ _id: req.body.postId });

  if (!post) {
    throw new NotFoundError("not found any comment ");
  }

  const comment = await Comments.create({ ...req.body });

  const commentWithInfoUser = await comment.populate({
    path: "user",
    select: "name profilePic -_id",
  });

  res.status(201).json({ commentWithInfoUser });
};

const getAllCommentofPost = async (req, res) => {
  const comment = await Comments.find({ post: req.body.postId })
    .populate({
      path: "user",
      select: "name profilePic -_id",
    })
    .populate({
      path: "replies",
      populate: {
        path: "user",
        select: "name profilePic -_id",
      },
    });

  if (!comment.length) {
    throw new NotFoundError("not found any comment ");
  }
  res.status(200).json({ comment });
};

const replyComment = async (req, res) => {
  const { comment } = req.body;
  const findComment = await Comments.findOne({
    _id: req.params.id,
  })
    // .populate("user", "name profilePic")
    .populate({
      path: "replies",
      select: "name profilePic -_id",
      populate: {
        path: "user",
        select: "name profilePic -_id",
      },
    });

  const reply = await findComment.addReplyComment(req.user.userId, comment);
  res.status(200).json({ reply });
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
