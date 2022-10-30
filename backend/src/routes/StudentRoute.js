// IMPORT
const router = require("express").Router();
const { useError } = require("../controllers/ErrorController");
const {
  getStudents,
  getStudentById,
  searchStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/StudentController");
const {
  validSearch,
  validAdd,
  validUpdate,
} = require("../utils/validation/validStudent");
const { verifyAccessToken } = require("../utils/auth/jwt");

// API
router.get("/read", verifyAccessToken, getStudents);
router.get("/read/:id", verifyAccessToken, getStudentById);
router.get("/search", verifyAccessToken, validSearch, searchStudent);
router.post("/add", verifyAccessToken, validAdd, addStudent);
router.patch("/update/:id", verifyAccessToken, validUpdate, updateStudent);
router.delete("/delete/:id", verifyAccessToken, deleteStudent);
router.use("/", useError);

// EXPORT
module.exports = router;
