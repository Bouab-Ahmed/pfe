const { NotFoundError } = require("../errors");
const Post = require("../models/postModel");
const { uploadProductImageLocal } = require("./uploadsController");
// const User = require("../models/userModel");

const createNewPost = async (req, res) => {
  const pathImg = await uploadProductImageLocal(req);
  const post = await Post.create({ ...req.body, user: req.user.userId, image: pathImg });
  post.tags.push(req.body.idTag);
  await post.save();
  res.status(200).json({ post });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({
    $or: [
      // { following: { $in: req.user.following } },
      { tags: { $in: req.user.tags } },
    ],
  });

  if (!posts.length) {
    throw new NotFoundError("not found any post ");
  }

  res.status(200).json(posts);
};

const getSinglePost = async (req, res) => {
  const post = await Post.findById({ _id: req.params.id })
    .populate({
      path: "user",
      select: "name profilePic _id",
    })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name profilePic _id",
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "replies",
        populate: {
          path: "user",
          select: "name profilePic _id",
        },
      },
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
  const post = await Post.findOne({ _id: req.params.id });

  if (!post) {
    throw new NotFoundError("this post not found");
  }

  post.remove();

  res.status(200).json({ post });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
};
