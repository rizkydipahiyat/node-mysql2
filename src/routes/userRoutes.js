const express = require("express");
const {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controller/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/s", searchUser);
router.post("/", postUser);
router.route("/:id").patch(updateUser).delete(deleteUser);

module.exports = router;
