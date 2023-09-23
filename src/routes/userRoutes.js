const express = require("express");
const {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", postUser);
router.route("/:id").patch(updateUser).delete(deleteUser);

module.exports = router;
