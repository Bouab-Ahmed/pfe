const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
  like,
  dislike,
  searchPostsByCategory,
} = require("../controllers/postControllers");
const { auth } = require("../middleware/authMiddleware");

router.route("/").get(auth, getAllPosts).post(auth, createNewPost);
router.route("/:id/like").put(auth, like);
router.route("/:id/dislike/").put(auth, dislike);
router.route("/search").post(auth, searchPostsByCategory);

router
  .route("/:id")
  .get(auth, getSinglePost)
  .put(auth, updatePost)
  .delete(auth, deletePost);

module.exports = router;
