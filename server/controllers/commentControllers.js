const { CustomError } = require("../errors");
const Post = require("../models/postModel");

const createNewComment = async (req, res) => {
  //   req.user.userId;
  const { comment } = req.body;

  const post = await Post.findById({ _id: req.body.postId });

  if (!post) {
    throw new CustomError.NotFoundError("not found any product ");
  }

  const addPost = await post.addComment(req.user.userId, comment);

  res.status(201).json(addPost);
};

const updateComment = async (req, res) => {
  res.status(200).json("update");
};

const deleteComment = async (req, res) => {
  res.status(200).json("remove");
};

module.exports = { createNewComment, updateComment, deleteComment };
