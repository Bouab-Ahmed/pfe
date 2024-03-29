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
    tags: [req.body.idTag],
  });
  res.status(200).json({ post });
};

const getRandomPosts = async (req, res) => {
  const posts = await Post.find()
    .populate({
      path: "tags",
      select: "name _id",
    })
    .populate({
      path: "user",
      select: "name profilePic _id ",
    });
  res.status(200).json({ posts });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({
    $and: [
      // { following: { $in: req.user.following } },
      { tags: { $in: req.user.tags } },
      { stauts: "published" },
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
  // const { stauts } = req.body;

  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );

  if (!post) {
    throw new NotFoundError("this post not found");
  }

  // await post.save();

  res.status(200).json({ msg: "updated success", post });
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

  const isLiked = await post.like.findIndex(
    (like) => like.user.toString() === req.user.userId
  );

  const existingDislikeIndex = post.dislike.findIndex(
    (dislike) => dislike.user.toString() === req.user.userId
  );

  if (existingDislikeIndex !== -1) {
    post.dislike.splice(existingDislikeIndex, 1);
  }

  if (isLiked !== -1) {
    post.like.splice(isLiked, 1);
  } else {
    post.like.push({ user: req.user.userId });
  }

  await post.save();

  res
    .status(200)
    .json({ likes: post.like.length, dislikes: post.dislike.length });
};

const dislike = async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });

  if (!post) {
    throw new NotFoundError("this post not found");
  }

  const isLiked = await post.like.findIndex(
    (like) => like.user.toString() === req.user.userId
  );

  const existingDislikeIndex = post.dislike.findIndex(
    (dislike) => dislike.user.toString() === req.user.userId
  );

  if (isLiked !== -1) {
    post.like.splice(isLiked, 1);
  }

  if (existingDislikeIndex !== -1) {
    post.dislike.splice(existingDislikeIndex, 1);
  } else {
    post.dislike.push({ user: req.user.userId });
  }

  await post.save();

  res
    .status(200)
    .json({ dislikes: post.dislike.length, likes: post.like.length });
};

const getSingleUserPosts = async (req, res) => {
  const posts = await Post.find({ user: req.params.id })
    .populate({
      path: "tags",
      select: "name _id",
    })
    .populate({
      path: "user",
      select: "name profilePic _id following follower",
    });

  if (!posts.length) {
    throw new NotFoundError("not found any post ");
  }

  res.status(200).json(posts);
};

const searchPostsByCategory = async (req, res) => {
  const searchQuery = req.body.searchInput;
  const searchField = req.body.option;
  let query = {};
  let posts = [];

  // Check if the user is logged in
  const loggedIn = req.user !== undefined;

  const baseQuery = loggedIn
    ? { $and: [{ tags: { $in: req.user.tags } }, { stauts: "published" }] }
    : { stauts: "published" };

  if (searchField === "all" || searchField === "content") {
    const byUser = await Post.find(baseQuery)
      .populate({
        path: "user",
        match: { name: { $regex: new RegExp(searchQuery, "i") } },
        select: "_id name profilePic",
      })
      .then((posts) => {
        const filteredPosts = posts.filter((post) => post.user !== null);
        return filteredPosts;
      });

    const byTag = await Post.find(baseQuery)
      .populate({
        path: "tags",
        match: { name: { $regex: new RegExp(searchQuery, "i") } },
        select: "name",
      })
      .then((posts) => {
        const filteredPosts = posts.filter((post) => post.tags.length !== 0);
        return filteredPosts;
      });

    const byTitleAndContent = await Post.find({
      ...baseQuery,
      $or: [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ],
    });

    posts = [
      ...new Set(
        [...byTitleAndContent, ...byUser, ...byTag].map((obj) => {
          return obj._id.toString();
        })
      ),
    ];

    posts = await Post.find({ _id: posts })
      .populate({
        path: "user",
        select: "_id name profilePic",
      })
      .populate({
        path: "tags",
        select: "_id name",
      });
  } else if (searchField === "user") {
    posts = await Post.find(baseQuery)
      .populate({
        path: "user",
        match: { name: { $regex: new RegExp(searchQuery, "i") } },
        select: "_id name profilePic",
      })
      .populate({
        path: "tags",
        select: "_id name",
      })
      .then((posts) => {
        const filteredPosts = posts.filter((post) => post.user !== null);
        return filteredPosts;
      });
  } else if (searchField === "tags") {
    posts = await Post.find(baseQuery)
      .populate({
        path: "tags",
        match: { name: { $regex: new RegExp(searchQuery, "i") } },
        select: "name",
      })
      .populate({
        path: "user",
        select: "_id name profilePic",
      })
      .then((posts) => {
        const filteredPosts = posts.filter((post) => post.tags.length !== 0);
        return filteredPosts;
      });
  } else {
    query[searchField] = { $regex: new RegExp(searchQuery, "i") };

    posts = await Post.find({ ...baseQuery, ...query }).populate({
      path: "user tags",
      select: "_id name profilePic",
    });
  }

  res.status(200).json(posts);
};


module.exports = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
  like,
  dislike,
  getRandomPosts,
  getSingleUserPosts,
  searchPostsByCategory,
};

// for remaind me
// posts = await Post.aggregate([
//   {
//     $match: {
//       $or: [
//         { title: { $regex: new RegExp(searchQuery, "i") } },
//         { content: { $regex: new RegExp(searchQuery, "i") } },
//         // { "user.name": { $regex: new RegExp(searchQuery, "i") } },
//       ],
//     },
//   },

//   {
//     $lookup: {
//       from: "users", // Assuming your User collection is named "users"
//       localField: "user", //this field you can find it inside PostSchema
//       foreignField: "_id", // _id you can find it inside userSchema
//       as: "user",
//     },
//   },
//   {
//     $unwind: "$user",
//   },
// ]);
