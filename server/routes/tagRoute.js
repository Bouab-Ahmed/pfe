const express = require("express");
const router = express.Router();
const {
  createTag,
  getAllTags,
  getSingleTag,
} = require("../controllers/tagController");
const { auth } = require("../middleware/authMiddleware");

router.route("/").get( getAllTags).post(auth, createTag);
router.route("/:id").get(auth, getSingleTag);

module.exports = router;
