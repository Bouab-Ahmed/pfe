const express = require("express");
const router = express.Router();
const { createTag, getAllTags } = require("../controllers/tagController");
const { auth } = require("../middleware/authMiddleware");

router.route("/").get(auth, getAllTags).post(auth, createTag);

module.exports = router;
