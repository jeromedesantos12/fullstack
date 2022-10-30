// IMPORT
const router = require("express").Router();
const { useError } = require("../controllers/ErrorController");
const {
  getUsers,
  getUserById,
  searchUser,
  addUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
  profileUser,
  verifyUser,
} = require("../controllers/UserController");
const {
  validSearch,
  validAdd,
  validUpdate,
  validLogin,
  validProfile,
} = require("../utils/validation/validUser");
const { validRole } = require("../utils/validation/validRole");
const { verifyAccessToken } = require("../utils/auth/jwt");

// API
router.get("/read", verifyAccessToken, validRole, getUsers);
router.get("/read/:id", verifyAccessToken, getUserById);
router.get("/search", verifyAccessToken, validRole, validSearch, searchUser);
router.post("/add", verifyAccessToken, validRole, validAdd, addUser);
router.patch(
  "/update/:id",
  verifyAccessToken,
  validRole,
  validUpdate,
  updateUser
);
router.delete("/delete/:id", verifyAccessToken, validRole, deleteUser);
router.post("/register", validProfile, registerUser);
router.post("/login", validLogin, loginUser);
router.delete("/logout", logoutUser);
router.patch("/profile/:id", verifyAccessToken, validProfile, profileUser);
router.get("/verify", verifyAccessToken, verifyUser);
router.use("/", useError);

// EXPORT
module.exports = router;
