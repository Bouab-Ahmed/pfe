const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
} = require("../controllers/postControllers");
const { auth } = require("../middleware/authMiddleware");
// const protect = require('../middleware/authMiddleware');

router.route("/").get(auth, getAllPosts).post(auth, createNewPost);

router
  .route("/:id")
  .get(auth, getSinglePost)
  .put(auth, updatePost)
  .delete(auth, deletePost);

module.exports = router;
