// IMPORT
const router = require("express").Router();
const { useError } = require("../controllers/ErrorController");

// API
router.use("*", useError);

// EXPORT
module.exports = router;
