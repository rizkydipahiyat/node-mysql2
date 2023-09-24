const dbPool = require("../config/database");

const getAllUsers = (page, perPage) => {
  const offset = (page - 1) * perPage;
  const SQLQuery = `SELECT * FROM users LIMIT ?, ?`;
  return dbPool.execute(SQLQuery, [`${offset}`, `${perPage}`]);
};

const getTotalUsersCount = () => {
  const SQLQuery = "SELECT COUNT(*) as count FROM users";
  return dbPool.execute(SQLQuery);
};

const getSearchUser = (keyword, page, perPage) => {
  const offset = (page - 1) * perPage;
  const SQLQuery = `SELECT * FROM users WHERE name LIKE ? OR email LIKE ? LIMIT ?, ?`;
  return dbPool.execute(SQLQuery, [
    `%${keyword}%`,
    `%${keyword}%`,
    `${offset}`,
    `${perPage}`,
  ]);
};

const postNewUser = (body) => {
  const SQLQuery = `INSERT INTO users(name, email, address) 
                    VALUE (?, ?, ?)`;
  return dbPool.execute(SQLQuery, [body.name, body.email, body.address]);
};

const updateUserById = (body, id) => {
  const SQLQuery = `UPDATE users SET name=?, email=?, address=? WHERE id=?`;
  return dbPool.execute(SQLQuery, [body.name, body.email, body.address, id]);
};

const deleteUserById = (id) => {
  const SQLQuery = `DELETE FROM users WHERE id=${id}`;
  return dbPool.execute(SQLQuery);
};

const checkDuplicateEmail = async (email) => {
  const [rows] = await dbPool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows.length > 0;
};

module.exports = {
  getAllUsers,
  getTotalUsersCount,
  getSearchUser,
  postNewUser,
  updateUserById,
  deleteUserById,
  checkDuplicateEmail,
};
