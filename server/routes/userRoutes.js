const express = require("express");
const {
  getAllUsers,
  getSingleUsers,
  updateUser,
  removeUser,
  updatePassword,
  setCurrentUser,
  addTag,
  addFollow,
} = require("../controllers/userControllers");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(auth, getAllUsers);
router.route("/me").get(auth, setCurrentUser);
router.route("/:id").get(auth, getSingleUsers);
router.route("/updateUser/:id").patch(auth, updateUser);
router.route("/removeUser").patch(auth, removeUser);
router.route("/updatePassword").patch(auth, updatePassword);
router.route("/addFollow/:id").post(auth, addFollow);
router.route("/addTag/:id").post(auth, addTag);

module.exports = router;
