const dbPool = require("../config/database");

const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM users";
  return dbPool.execute(SQLQuery);
};

const postNewUser = (body) => {
  const SQLQuery = `INSERT INTO users(name, email, address) 
                    VALUE ('${body.name}', '${body.email}', '${body.address}')`;
  return dbPool.execute(SQLQuery);
};

const updateUserById = (body, id) => {
  const SQLQuery = `UPDATE users SET name='${body.name}', email='${body.email}', address='${body.address}' WHERE id=${id}`;
  return dbPool.execute(SQLQuery);
};

const deleteUserById = (id) => {
  const SQLQuery = `DELETE FROM users WHERE id=${id}`;
  return dbPool.execute(SQLQuery);
};

const checkDuplicateEmail = (email) => {
  const SQLQuery = "SELECT * FROM users WHERE email = ?";
  return dbPool.execute(SQLQuery, [email]);
};

module.exports = {
  getAllUsers,
  postNewUser,
  updateUserById,
  deleteUserById,
  checkDuplicateEmail,
};
