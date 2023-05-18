const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
  like,
  dislike
} = require("../controllers/postControllers");
const { auth } = require("../middleware/authMiddleware");

router.route("/").get(auth, getAllPosts).post(auth, createNewPost);
router.route("/like").put(auth, like)
router.route("/dislike").put(auth, dislike)

router
  .route("/:id")
  .get(auth, getSinglePost)
  .put(auth, updatePost)

  .delete(auth, deletePost);

module.exports = router;
