// IMPORT
const express = require("express");
const router = express.Router();
const { useError } = require("../controllers/ErrorController");

// METHOD API
router.use("*", useError);

// EXPORT
module.exports = router;
