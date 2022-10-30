// IMPORT
const validator = require("validator");
const User = require("../../models/UserModel");

// ARRAY
const arrRole = ["ADMIN", "USER"];

// CEK ROLE
const cekRole = (value, role) => {
  if (!role) {
    value.role = "Role tidak boleh kosong!";
  } else if (!arrRole.includes(role)) {
    value.role = "Role hanya ADMIN dan USER!";
  }
  return value;
};

// CEK VALIDASI USER
const validUser = (value, nama, email, password, passwordConfirmation) => {
  if (!nama) {
    value.nama = "Nama tidak boleh kosong!";
  }
  if (!email) {
    value.email = "Email tidak boleh kosong!";
  } else if (!validator.isEmail(email)) {
    value.email = "Email tidak valid!";
  }
  if (!password) {
    value.password = "Password tidak boleh kosong!";
  } else if (!validator.isLength(password, { min: 8 })) {
    value.password = "Password minimal 8 karakter!";
  }
  if (!passwordConfirmation) {
    value.passwordConfirmation = "Password Confirmation tidak boleh kosong!";
  } else if (passwordConfirmation !== password) {
    value.passwordConfirmation =
      "Password dan Password Confirmation tidak sama!";
  }
  return value;
};

// CARI DATA DUPLIKAT
const duplicate = async (req, res) => {
  const value = {};
  try {
    const { email } = req.body;
    value.duplicateEmail = await User.findOne({ email });
  } catch (error) {
    value.error = error.message;
  }
  return value;
};

// VALIDASI ADD USER
exports.validAdd = async (req, res, next) => {
  const { nama, email, password, passwordConfirmation, role } = req.body;
  const value = {};
  const { duplicateEmail, error } = await duplicate(req, res);
  validUser(value, nama, email, password, passwordConfirmation);
  cekRole(value, role);
  if (duplicateEmail) value.addEmail = "Email sudah digunakan!";
  if (Object.keys(value).length > 0)
    return res.status(400).json({
      status: "400 Bad Request",
      message: value,
    });
  if (error)
    return res.status(500).json({
      status: "500 Internal Server Error",
      message: error || "Terjadi kesalahan saat mencari data duplikat!",
    });
  next();
};

// VALIDASI UPDATE USER
exports.validUpdate = (req, res, next) => {
  const { role } = req.body;
  const value = {};
  cekRole(value, role);
  if (Object.keys(value).length > 0)
    return res.status(400).json({
      status: "400 Bad Request",
      message: value,
    });
  next();
};

// VALIDASI PROFILE USER
exports.validProfile = async (req, res, next) => {
  const { nama, email, password, passwordConfirmation } = req.body;
  const { id } = req.params;
  const value = {};
  const { duplicateEmail, error } = await duplicate(req, res);
  validUser(value, nama, email, password, passwordConfirmation);
  if (duplicateEmail && id !== duplicateEmail._id.toString())
    value.profileEmail = "Email sudah digunakan oleh data lain!";
  if (Object.keys(value).length > 0)
    return res.status(400).json({
      status: "400 Bad Request",
      message: value,
    });
  if (error)
    return res.status(500).json({
      status: "500 Internal Server Error",
      message: error || "Terjadi kesalahan saat mencari data duplikat!",
    });
  next();
};

// VALIDASI SEARCH
exports.validSearch = (req, res, next) => {
  const { input } = req.query;
  const value = {};
  if (!input) value.input = "Input tidak boleh kosong!";
  if (Object.keys(value).length > 0)
    return res.status(400).json({
      status: "400 Bad Request",
      message: value,
    });
  next();
};

// VALIDASI LOGIN
exports.validLogin = (req, res, next) => {
  const { email, password } = req.body;
  const value = {};
  if (!email) {
    value.email = "Email tidak boleh kosong!";
  }
  if (!password) {
    value.password = "Password tidak boleh kosong!";
  }
  if (Object.keys(value).length > 0)
    return res.status(400).json({
      status: "400 Bad Request",
      message: value,
    });
  next();
};
