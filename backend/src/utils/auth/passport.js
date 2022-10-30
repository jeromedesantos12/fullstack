// IMPORT
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { hashPassword } = require("../../utils/auth/bcrypt");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = process.env;
const { generateAccessToken } = require("../../utils/auth/jwt");
const passport = require("passport");
const User = require("../../models/UserModel");

// GOOGLE STRATEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, callback) => {
      const user = {};
      try {
        const userLog = await User.findOne({ email: profile.emails[0].value });
        if (userLog) {
          user.token = generateAccessToken(userLog._id, userLog.role);
        } else {
          const newUser = new User({
            nama: profile.displayName,
            email: profile.emails[0].value,
            password: await hashPassword(
              Math.random().toString().split(".")[1]
            ),
            role: "USER",
          });
          await newUser.save();
          const newUserFind = await User.findOne({
            email: profile.emails[0].value,
          });
          user.token = generateAccessToken(newUserFind._id, newUserFind.role);
        }
      } catch (error) {
        user.error = error;
      }
      callback(null, user);
    }
  )
);

// FACEBOOK STRATEGY
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["displayName", "email"],
      scope: ["email"],
    },
    async (accessToken, refreshToken, profile, callback) => {
      // #####################
      console.log("profile", profile);
      // #####################

      const user = {};
      try {
        const userLog = await User.findOne({ email: profile.emails[0].value });
        if (userLog) {
          user.token = generateAccessToken(userLog._id, userLog.role);
        } else {
          const newUser = new User({
            nama: profile.displayName,
            email: profile.emails[0].value,
            password: await hashPassword(
              Math.random().toString().split(".")[1]
            ),
            role: "USER",
          });
          await newUser.save();
          const newUserFind = await User.findOne({
            email: profile.emails[0].value,
          });
          user.token = generateAccessToken(newUserFind._id, newUserFind.role);
        }
      } catch (error) {
        user.error = error;
      }

      // #####################
      console.log("user", user);
      // #####################

      callback(null, user);
    }
  )
);

// SETUP SESSION
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
