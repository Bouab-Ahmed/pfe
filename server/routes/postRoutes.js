const express = require("express");
const router = express.Router();
const {
  getPost,
  setPost,
  updatePost,
  deletePost,
} = require("../controllers/postControllers");
const { auth } = require("../middleware/authMiddleware");
// const protect = require('../middleware/authMiddleware');

router.route("/").get(auth, getPost).post(auth, setPost);

router.route("/:id").put(auth, updatePost).delete(auth, deletePost);

module.exports = router;
