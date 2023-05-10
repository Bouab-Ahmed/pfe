const { NotFoundError } = require("../errors");
const Post = require("../models/postModel");
// const User = require("../models/userModel");

const createNewPost = async (req, res) => {
  const post = await Post.create({ ...req.body, user: req.user.userId });

  res.status(200).json({ post });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
};

const getSinglePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name profilePic -_id",
      },
    })
    .populate({
      path: "user",
      select: "name profilePic -_id",
    });

  if (!post) {
    throw new NotFoundError("not found any post ");
  }
  res.status(200).json({ post });
};

const updatePost = async (req, res) => {
  res.status(200).send("updatedPost");
};

const deletePost = async (req, res) => {
  const comment = await Post.findOne({ _id: req.params.id });

  if (!comment) {
    throw new NotFoundError("this post not found");
  }

  comment.remove();

  res.status(200).json({ comment });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
};
