// METHOD URL SALAH
exports.useError = (req, res) => {
  res.status(404).json({
    status: "404 Not Found",
    message: "URL tidak ditemukan!",
  });
};
