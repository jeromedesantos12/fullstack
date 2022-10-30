// IMPORT
const validator = require("validator");
const Student = require("../../models/StudentModel");

// ARRAY
const arrGender = ["Pria", "Wanita"];
const arrJurusan = [
  "Teknik Informasi",
  "Sistem Informasi",
  "Teknik Komputer Jaringan",
];

// CEK VALIDASI STUDENT
const validStudent = (value, nim, nama, gender, telp, jurusan) => {
  if (!nim) {
    value.nim = "NIM tidak boleh kosong!";
  } else if (!validator.isNumeric(nim)) {
    value.nim = "NIM harus angka!";
  } else if (!validator.isLength(nim, { min: 10, max: 10 })) {
    value.nim = "NIM harus 10 karakter!";
  }
  if (!nama) {
    value.nama = "Nama tidak boleh kosong!";
  } else if (!validator.isAlpha(nama, "en-US", { ignore: " " })) {
    value.nama = "Nama harus huruf!";
  }
  if (!gender) {
    value.gender = "Gender tidak boleh kosong!";
  } else if (!arrGender.includes(gender)) {
    value.gender = "Gender hanya Pria dan Wanita!";
  }
  if (!telp) {
    value.telp = "Telp tidak boleh kosong!";
  } else if (!validator.isMobilePhone(telp, "id-ID")) {
    value.telp = "Telp tidak valid!";
  }
  if (!jurusan) {
    value.jurusan = "Jurusan tidak boleh kosong!";
  } else if (!arrJurusan.includes(jurusan)) {
    value.jurusan =
      "Jurusan hanya Teknik Informasi, Sistem Informasi dan Teknik Komputer Jaringan";
  }
  return value;
};

// CARI DATA DUPLIKAT
const duplicate = async (req, res) => {
  const value = {};
  try {
    const { nim, telp } = req.body;
    value.duplicateNIM = await Student.findOne({ nim });
    value.duplicateTelp = await Student.findOne({ telp });
  } catch (error) {
    value.error = error.message;
  }
  return value;
};

// VALIDASI ADD STUDENT
exports.validAdd = async (req, res, next) => {
  const { nim, nama, gender, telp, jurusan } = req.body;
  const value = {};
  const { duplicateNIM, duplicateTelp, error } = await duplicate(req, res);
  validStudent(value, nim, nama, gender, telp, jurusan);
  if (duplicateNIM) value.addNIM = "NIM sudah digunakan!";
  if (duplicateTelp) value.addTelp = "Telp sudah digunakan!";
  if (Object.keys(value).length > 0)
    return res.status(400).json({
      status: "400 Bad request",
      message: value,
    });
  if (error)
    return res.status(500).json({
      status: "500 Internal Server Error",
      message: error || "Terjadi kesalahan saat mencari data duplikat!",
    });
  next();
};

// VALIDASI UPDATE STUDENT
exports.validUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { nim, nama, gender, telp, jurusan } = req.body;
  const value = {};
  const { duplicateNIM, duplicateTelp, error } = await duplicate(req, res);
  validStudent(value, nim, nama, gender, telp, jurusan);
  if (duplicateNIM && id !== duplicateNIM._id.toString())
    value.updateNIM = "NIM sudah digunakan oleh data lain!";
  if (duplicateTelp && id !== duplicateTelp._id.toString())
    value.updateTelp = "Telp sudah digunakan oleh data lain!";

  if (Object.keys(value).length > 0)
    return res.status(400).json({
      status: "400 Bad request",
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
exports.validSearch = async (req, res, next) => {
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
