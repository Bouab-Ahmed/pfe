const { NotFoundError } = require("../errors");
const Post = require("../models/postModel");

const createNewComment = async (req, res) => {
  //   req.user.userId;
  const { comment } = req.body;

  const post = await Post.findById({ _id: req.body.postId });

  if (!post) {
    throw new NotFoundError("not found any post ");
  }

  const addPost = await post.addComment(req.user.userId, comment);

  res.status(201).json(addPost);
};

const updateComment = async (req, res) => {
  res.status(200).json("update");
};

const deleteComment = async (req, res) => {
  const comment = await Post.findOne({ _id: req.body.postId });
  if (!comment) {
    throw new NotFoundError("not found any post ");
  }

  const post = await comment.removeComment(req.params.id);

  res.status(200).json({ msg: "deleted comment" });
};

module.exports = { createNewComment, updateComment, deleteComment };
