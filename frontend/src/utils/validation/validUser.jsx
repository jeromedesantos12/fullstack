// IMPORT
import validator from "validator";

// ARRAY
const arrRole = ["admin", "user"];

// CEK ROLE
const cekRole = (value, role) => {
  if (!role) {
    value.role = "Role tidak boleh kosong!";
  } else if (!arrRole.includes(role)) {
    value.role = "Role hanya admin dan user!";
  }
  return value;
};

// VALIDASI USER
const validUser = (value, username, email, password, passwordConfirmation) => {
  if (!username) {
    value.username = "Username tidak boleh kosong!";
  } else if (!validator.isAlphanumeric(username)) {
    value.username = "Username harus berupa huruf dan angka!";
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
export const validAdd = (
  username,
  email,
  password,
  passwordConfirmation,
  role
) => {
  const value = {};
  validUser(value, username, email, password, passwordConfirmation);
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
export const validProfile = (
  username,
  email,
  password,
  passwordConfirmation
) => {
  const value = {};
  validUser(value, username, email, password, passwordConfirmation);
  return value;
};

// VALIDASI LOGIN
export const validLogin = (user, password) => {
  const value = {};
  if (!user) {
    value.user = "Username atau email tidak boleh kosong!";
  }
  if (!password) {
    value.password = "Password tidak boleh kosong!";
  } else if (!validator.isLength(password, { min: 8 })) {
    value.password = "Password minimal 8 karakter!";
  }
  return value;
};
