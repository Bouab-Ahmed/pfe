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
  getRandomPosts,
  getSingleUserPosts,
} = require("../controllers/postControllers");
const { auth } = require("../middleware/authMiddleware");

router.route("/").get(auth, getAllPosts).post(auth, createNewPost);
router.route("/:id/like").put(auth, like);
router.route("/:id/dislike/").put(auth, dislike);
router.route("/random").get(getRandomPosts);
router.route("/user/:id").get(getSingleUserPosts);

router
  .route("/:id")
  .get(getSinglePost)
  .put(auth, updatePost)
  .delete(auth, deletePost);

module.exports = router;
