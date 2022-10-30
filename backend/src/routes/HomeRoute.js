// IMPORT
const express = require("express");
const router = express.Router();
const { getHome } = require("../controllers/HomeController");
const { verifyAccessToken } = require("../utils/auth/jwt");

// METHOD API
router.get("/", getHome);

// EXPORT
module.exports = router;
