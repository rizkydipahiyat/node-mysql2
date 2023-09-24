const {
  getAllUsers,
  postNewUser,
  deleteUserById,
  updateUserById,
  checkDuplicateEmail,
  getTotalUsersCount,
  getSearchUser,
} = require("../models/userModel");

// @desc    Fetch all products
// @routes  GET /users
const getUsers = async (req, res) => {
  try {
    const { page, keyword } = req.query;
    const perPage = 10;

    let data;
    let totalData;
    let totalPage;
    if (keyword) {
      const [searchData] = await getSearchUser(keyword, page, perPage);
      data = searchData;
      // Hitung Total Data
      const [totalCount] = await getTotalUsersCount();
      totalData = totalCount[0].count;
      totalPage = Math.ceil(totalData / perPage);
    } else {
      const [dataUsers] = await getAllUsers(page, perPage);
      data = dataUsers;
      // Hitung Total Page
      const [totalCount] = await getTotalUsersCount();
      totalData = totalCount[0].count;
      totalPage = Math.ceil(totalData / perPage);
    }

    res.status(200).json({
      status: "OK",
      data: data,
      totalPages: totalPage,
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error 500",
      serverMessage: error,
    });
  }
};

// @desc    Search users by keyword
// @routes  GET /users/search?keyword=xxx
const searchUser = async (req, res) => {
  const { keyword } = req.query;
  try {
    const [data] = await getSearchUser(keyword);
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

  if (!body.name || !body.email || !body.address) {
    return res.status(400).json({ message: "Data anda tidak memenuhi syarat" });
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
  searchUser,
  postUser,
  updateUser,
  deleteUser,
};
