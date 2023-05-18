const { NotFoundError } = require("../errors");
const Comments = require("../models/commentModel");
const Post = require("../models/postModel");

const createNewComment = async (req, res) => {
  req.body.user = req.user.userId;
  req.body.post = req.body.postId;

  const comment = await Comments.create({ ...req.body });
  

  const commentWithInfoUser = await comment.populate({
    path: "user",
    select: "name profilePic _id",
  });

  const isComment = await Comments.find({user:comment.user,post:comment.post})

  if(isComment.length === 1 ){
   await comment.increseCounters()
  }

  res.status(201).json({
    msg: "comment created success and wait admin approve it",
    comment: commentWithInfoUser,
  });
};

const getAllCommentofOnePost = async (req, res) => {
  const comment = await Comments.find({ post: req.params.id })
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
  const reply = await Comments.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { replies: { user: req.user.userId, comment } } },
    { new: true }
  )
    .populate("user", "name profilePic _id")
    .populate({
      path: "replies",
      populate: {
        path: "user",
        select: "name profilePic _id",
      },
    });

  if (!reply) {
    throw new NotFoundError("not found any comment to reply it ");
  }
  // const reply = await findComment.addReplyComment(req.user.userId, comment);
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
  getAllCommentofOnePost,
  replyComment,
};
