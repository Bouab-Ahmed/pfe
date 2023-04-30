const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel');
const User = require('../models/userModel');

//@desc     Get posts
//@route    GET /posts
//@access   Private(after we add authentication)
const getPost = asyncHandler(async (req, res) => {
  const posts =
    req.user.id !== 'undefined'
      ? await Post.find({ user: req.user.id })
      : await Post.find();

  res.status(200).json(posts);
});

//@desc     set posts
//@route    SET /posts
//@access   Private(after we add authentication)
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add some text');
  }

  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(post);
});

//@desc     update posts
//@route    PUT /posts
//@access   Private(after we add authentication)
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  // console.log(post);

  if (!post) {
    res.status(400);
    throw new Error("can't find this post");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("can't find this user");
  }

  if (req.user.id !== post.user.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this post');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(updatedPost);
});

//@desc     delete posts
//@route    DELETE /posts/:id
//@access   Private(after we add authentication)
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400).json({ msg: 'post not found' });
  }

  if (!req.user) {
    res.status(400);
    throw new Error("can't find this user");
  }

  if (req.user.id !== post.user.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this post');
  }

  await Post.remove();

  res.status(200).json({
    message: 'post removed',
    id: req.params.id,
  });
});


module.exports = {
  getPost,
  setPost,
  updatePost,
  deletePost,
};
