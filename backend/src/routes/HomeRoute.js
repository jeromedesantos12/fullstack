// IMPORT
const router = require("express").Router();
const { getHome } = require("../controllers/HomeController");

// API
router.get("/", getHome);

// EXPORT
module.exports = router;
