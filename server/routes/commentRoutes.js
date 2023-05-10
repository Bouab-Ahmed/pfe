const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {
  createNewComment,
  updateComment,
  deleteComment,
  getAllCommentofPost,
  replyComment,
} = require("../controllers/commentControllers");

router.route("/").post(auth, createNewComment).get(auth, getAllCommentofPost);

router
  .route("/:id")
  .post(auth, replyComment)
  .patch(auth, updateComment)
  .delete(auth, deleteComment);

module.exports = router;
