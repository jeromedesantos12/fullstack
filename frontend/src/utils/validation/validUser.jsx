// IMPORT
import validator from "validator";

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

// VALIDASI USER
const validUser = (value, nama, email, password, passwordConfirmation) => {
  if (!nama) {
    value.nama = "Username tidak boleh kosong!";
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

// VALIDASI ADD USER
export const validAdd = (nama, email, password, passwordConfirmation, role) => {
  const value = {};
  validUser(value, nama, email, password, passwordConfirmation);
  cekRole(value, role);
  return value;
};

// VALIDASI UPDATE USER
export const validUpdate = (role) => {
  const value = {};
  cekRole(value, role);
  return value;
};

// VALIDASI PROFILE USER
export const validProfile = (nama, email, password, passwordConfirmation) => {
  const value = {};
  validUser(value, nama, email, password, passwordConfirmation);
  return value;
};

// VALIDASI LOGIN
export const validLogin = (email, password) => {
  const value = {};
  if (!email) {
    value.email = "Email tidak boleh kosong!";
  }
  if (!password) {
    value.password = "Password tidak boleh kosong!";
  }
  return value;
};
