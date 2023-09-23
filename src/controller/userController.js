const {
  getAllUsers,
  postNewUser,
  deleteUserById,
  updateUserById,
  checkDuplicateEmail,
} = require("../models/userModel");

// @desc    Fetch all products
// @routes  GET /users
const getUsers = async (req, res) => {
  try {
    const [data] = await getAllUsers();
    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error 500",
      serverMessage: error,
    });
  }
};

// @desc    Create new user
// @routes  POST /users
const postUser = async (req, res) => {
  const { body } = req;

  const isEmailDuplicate = await checkDuplicateEmail(body.email);
  if (isEmailDuplicate) {
    return res.status(400).json({ message: "Email already exists" });
  }
  try {
    await postNewUser(body);
    res.status(201).json({
      status: "Created",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error 500",
      serverMessage: error,
    });
  }
};

// @desc    Update a user
// @routes  PATCH /users/:id
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await updateUserById(body, id);
    res.status(201).json({
      status: "Created",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error 500",
      serverMessage: error,
    });
  }
};

// @desc    Delete a user
// @routes  DELETE /users/:id
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserById(id);
    res.status(200).json({
      statu: "OK",
      message: "User has been removed!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error 500",
      serverMessage: error,
    });
  }
};

module.exports = {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
};
