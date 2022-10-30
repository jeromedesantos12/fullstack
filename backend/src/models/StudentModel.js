// IMPORT
const mongoose = require("mongoose");
// SCHEMA DB
const Student = mongoose.Schema({
  nim: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  telp: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
});

// EXPORT
module.exports = mongoose.model("Students", Student);
