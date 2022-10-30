// IMPORT
const Student = require("../models/StudentModel");

// METHOD DB
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (students.length == 0) {
      return res.status(204).json({
        status: "204 No Content",
        message: "Data masih kosong!",
        users,
      });
    }
    res.status(200).json({
      status: "200 OK",
      message: "Data berhasil ditampilkan!",
      students,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat menampilkan data!",
    });
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findOne({ _id: id });
    if (!student) {
      return res.status(404).json({
        status: "404 Not Found",
        message: "Data tidak ditemukan!",
      });
    }
    res.status(200).json({
      status: "200 OK",
      message: "Data berhasil ditampilkan!",
      student,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat menampilkan data!",
    });
  }
};

exports.searchStudent = async (req, res) => {
  const { input } = req.query;
  try {
    const result = await Student.find({
      $or: [
        { nim: { $regex: `${input}`, $options: "i" } },
        { nama: { $regex: `${input}`, $options: "i" } },
      ],
    });
    if (result.length == 0)
      return res.status(404).json({
        status: "404 Not Found",
        message: "Data tidak ditemukan!",
      });
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

exports.addStudent = async (req, res) => {
  const { nim, nama, gender, telp, jurusan } = req.body;
  try {
    const student = new Student({ nim, nama, gender, telp, jurusan });
    const added_student = await student.save();
    res.status(201).json({
      status: "201 Created",
      message: "Data ditambahkan!",
      added_student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat menambahkan data!",
    });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { nim, nama, gender, telp, jurusan } = req.body;
  try {
    const updated_student = await Student.updateOne(
      { _id: id },
      { $set: { nim, nama, gender, telp, jurusan } }
    );
    res.status(200).json({
      status: "200 OK ",
      message: "Data diperbarui!",
      updated_student,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat memperbarui data!",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted_student = await Student.deleteOne({ _id: id });
    res.status(200).json({
      status: "200 OK ",
      message: "Data dihapus!",
      deleted_student,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: error.message || "Terjadi error saat menghapus data!",
    });
  }
};
