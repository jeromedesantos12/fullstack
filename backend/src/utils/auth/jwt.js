// IMPORT
require("dotenv").config();
const { ACCESS_TOKEN_SECRET } = process.env;
const jwt = require("jsonwebtoken");

// LOGIN
exports.generateAccessToken = (id, role) => {
  return jwt.sign({ id, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

// ROUTES YG MAU DIJEGAT
exports.verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.cookies.token;
    if (!accessToken) {
      return res.status(401).json({
        status: "401 Unauthorized",
        message: "Pengguna belum mengirimkan access token!",
      });
    }
    const user = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    req.user = user;
  } catch (error) {
    console.log(error);
    const array = [
      "invalid token",
      "invalid signature",
      "jwt malformed",
      "jwt signature is required",
    ];
    if (array.includes(error.message)) {
      return res.status(403).json({
        status: "403 Forbidden",
        message: "Access token tidak sesuai!",
      });
    }
    if (error.message === "jwt expired") {
      return res.status(403).json({
        status: "403 Forbidden",
        message: "Access token kadaluarsa!",
      });
    }
    return res.status(500).json({
      status: "403 Forbidden",
      message: error.message || "Terjadi error saat verify access token!",
    });
  }
  next();
};
