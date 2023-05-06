const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {
  createNewComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentControllers");

router.route("/").post(auth, createNewComment);
router.route("/:id").post(auth, updateComment).delete(auth, deleteComment);

module.exports = router;
