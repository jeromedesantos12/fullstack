// IMPORT
const router = require("express").Router();
const passport = require("passport");
const {
  loginSuccessOauth,
  loginFailedOauth,
  logoutOauth,
} = require("../controllers/AuthController");

// API
router.get("/login/success", loginSuccessOauth);
router.get("/login/failed", loginFailedOauth);
router.get("/logout", logoutOauth);

// GOOGLE
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/success",
    failtureRedirect: "/auth/login/failed",
  })
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// facebook
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/auth/login/success",
    failtureRedirect: "/auth/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook"));

// EXPORT
module.exports = router;
