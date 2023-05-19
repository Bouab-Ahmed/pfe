const { NotFoundError } = require("../errors");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const { uploadProductImageLocal } = require("./uploadsController");
// const User = require("../models/userModel");

const createNewPost = async (req, res) => {
  const pathImg = await uploadProductImageLocal(req);

  const post = await Post.create({
    ...req.body,
    user: req.user.userId,
    image: pathImg,
  });

  await post.decrease(req.body.idTag);

  res.status(200).json({ post });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({
    $or: [
      // { following: { $in: req.user.following } },
      { tags: { $in: req.user.tags } },
    ],
  })
    .populate({
      path: "tags",
      select: "name _id",
    })
    .populate({
      path: "user",
      select: "name profilePic _id following follower createdAt",
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
      select: "name profilePic _id following follower",
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
    })
    .populate({
      path: "tags",
      select: "name _id",
    });

  if (!post) {
    throw new NotFoundError("not found any post ");
  }
  res.status(200).json({ post });
};

const updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );

  if (!post) {
    throw new NotFoundError("this post not found");
  }

  res.status(200).json({ post });
};

const deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  if (!post) {
    throw new NotFoundError("this post not found");
  }

  post.remove();

  res.status(200).json({ post });
};

const like = async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });

  if (!post) {
    throw new NotFoundError("this post not found");
  }

  const isLiked = await Post.findOne({
    _id: req.params.id,
    "like.user": req.user.userId,
  });

  if (!isLiked) {
    post.dislike.pop({ user: req.user.userId });
    post.like.push({ user: req.user.userId });
    await post.save();
  } else {
    post.like.pop({ user: req.user.userId });
    await post.save();
  }

  res.status(200).json({ likes: post.like.length });
};

const dislike = async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });

  if (!post) {
    throw new NotFoundError("this post not found");
  }

  const isDislike = await Post.findOne({
    _id: req.params.id,
    "dislike.user": req.user.userId,
  });

  if (!isDislike) {
    post.like.pop({ user: req.user.userId });
    post.dislike.push({ user: req.user.userId });
    await post.save();
  } else {
    post.dislike.pop({ user: req.user.userId });
    await post.save();
  }

  res.status(200).json({ dislikes: post.dislike.length });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
  like,
  dislike,
};
