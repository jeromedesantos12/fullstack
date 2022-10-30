// VALIDASI ROLE
exports.validRole = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(500).json({
      status: "403 Forbidden",
      message: "Kamu bukan ADMIN!",
    });
  }
  next();
};
