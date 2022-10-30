// VALIDASI ROLE
exports.validRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(500).json({
      status: "403 Forbidden",
      message: "Kamu bukan admin!",
    });
  }
  next();
};
