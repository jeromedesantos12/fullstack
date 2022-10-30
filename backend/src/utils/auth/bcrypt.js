// IMPORT
const bcrypt = require("bcrypt");

// REGISTER, ADD & PROFILE USER
exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// LOGIN USER
exports.comparePassword = async (password, db) => {
  return await bcrypt.compare(password, db.password);
};
