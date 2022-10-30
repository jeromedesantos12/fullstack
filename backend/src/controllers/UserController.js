// IMPORT
const User = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../utils/auth/bcrypt");
const { generateAccessToken } = require("../utils/auth/jwt");

// METHOD DB
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { _id: "$_id", nama: "$nama", email: "$email", role: "$role" }
    );
    if (users.length == 0) {
      return res.status(204).json({
        status: "204 No Content",
        message: "Data masih kosong!",
        users,
      });
    }
    res.status(200).json({
      status: "200 OK",
      message: "Data berhasil ditampilkan!",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat menampilkan data!",
    });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne(
      { _id: id },
      { _id: "$_id", nama: "$nama", email: "$email", role: "$role" }
    );
    if (!user) {
      return res.status(404).json({
        status: "404 Not Found",
        message: "Data tidak ditemukan!",
      });
    }
    res.status(200).json({
      status: "200 OK",
      message: "Data berhasil ditampilkan!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat menampilkan data!",
    });
  }
};

exports.searchUser = async (req, res) => {
  const { input } = req.query;
  try {
    const result = await User.find(
      {
        $or: [
          { email: { $regex: `${input}`, $options: "i" } },
          { role: { $regex: `${input}`, $options: "i" } },
        ],
      },
      {
        _id: "$_id",
        nama: "$nama",
        email: "$email",
        role: "$role",
      }
    );
    if (result.length === 0) {
      return res.status(404).json({
        status: "404 Not Found",
        message: "Data tidak ditemukan!",
      });
    }
    res.status(200).json({
      status: "200 OK",
      message: "Data berhasil ditemukan!",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat mencari data!",
    });
  }
};

exports.addUser = async (req, res) => {
  const { nama, email, password, role } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = new User({ nama, email, password: hashedPassword, role });
    const added_user = await user.save();
    res.status(201).json({
      status: "201 Created",
      message: "Data ditambahkan!",
      added_user,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat menambahkan data!",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updated_user = await User.updateOne({ _id: id }, { $set: { role } });
    res.status(200).json({
      status: "200 OK",
      message: "Data diperbarui!",
      updated_user,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat memperbarui data!",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted_user = await User.deleteOne({ _id: id });
    res.status(200).json({
      status: "200 OK",
      message: "Data dihapus!",
      deleted_user,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat menghapus data!",
    });
  }
};

exports.profileUser = async (req, res) => {
  const { id } = req.params;
  const { nama, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const profiled_user = await User.updateOne(
      { _id: id },
      { $set: { nama, email, password: hashedPassword } }
    );
    res.status(200).json({
      status: "200 OK",
      message: "Data diperbarui!",
      profiled_user,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat memperbarui data!",
    });
  }
};

exports.registerUser = async (req, res) => {
  const { nama, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = new User({
      nama,
      email,
      password: hashedPassword,
      role: "USER",
    });
    const registered_user = await user.save();
    res.status(201).json({
      status: "201 Created",
      message: "Data ditambahkan!",
      registered_user,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat menambahkan data!",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLog = await User.findOne({ email: email });
    if (!userLog) {
      return res.status(404).json({
        status: "404 Not Found",
        message: { authEmail: "Email tidak ditemukan!" },
      });
    }
    const hashedPassword = await comparePassword(password, userLog);
    if (!hashedPassword) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: { authPassword: "Password Salah!" },
      });
    }
    const token = generateAccessToken(userLog._id, userLog.role);
    req.session = null;
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 1000,
      })
      .status(200)
      .json({
        status: "200 OK",
        message: "Login Berhasil!",
      });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat login!",
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session = null;
  res.clearCookie("token").status(200).json({
    status: "200 OK",
    message: "Anda telah logout!",
  });
};

exports.verifyUser = (req, res) => {
  res.status(200).json({
    status: "200 OK",
    message: "Konten dibuka!",
    info: {
      id: req.user.id,
      role: req.user.role,
    },
  });
};
