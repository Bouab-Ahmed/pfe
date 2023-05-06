const { CustomError } = require("../errors");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const createNewPost = async (req, res) => {
  const post = await Post.create({ ...req.body, user: req.user.userId });
  res.status(200).json({ post });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
};

const getSinglePost = async (req, res) => {
  console.log(req.params.id);
  const post = await Post.findOne({ _id: req.params.id });

  if (!post) {
    throw new CustomError.NotFoundError("not found any product ");
  }
  res.status(200).json({ post, commentLength: post.comments.length });
};

const updatePost = async (req, res) => {
  res.status(200).send("updatedPost");
};

const deletePost = async (req, res) => {
  res.status(200).json({ removed });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
};
