// IMPORT
const bcrypt = require("bcrypt");

// REGISTER, ADD & UPDATE USER
exports.hashPassword = async (req, res) => {
  return await bcrypt.hash(req.body.password, 10);
};

// LOGIN USER
exports.comparePassword = async (req, res, hash) => {
  return await bcrypt.compare(req.body.password, hash.password);
};
