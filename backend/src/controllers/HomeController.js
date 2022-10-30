// METHOD URL SALAH
exports.getHome = (req, res) => {
  res.status(200).json({
    status: "200 OK",
    message: "Selamat datang di Rest API saya!",
  });
};
