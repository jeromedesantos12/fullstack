// IMPORT
import validator from "validator";

// ARRAY
const arrGender = ["Pria", "Wanita"];
const arrJurusan = [
  "Teknik Informasi",
  "Sistem Informasi",
  "Teknik Komputer Jaringan",
];

// VALIDASI STUDENT
export const validStudent = (nim, nama, gender, telp, jurusan) => {
  const value = {};
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
