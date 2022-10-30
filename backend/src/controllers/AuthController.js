// IMPORT
require("dotenv").config();
const { CLIENT_URL } = process.env;

// METHOD PASSPORT
exports.loginSuccessOauth = (req, res) => {
  // #####################
  console.log("token", req.user.token);
  // #####################

  if (!req.user.token) {
    return res.redirect(`/auth/logout`);
  }
  const { token } = req.user;
  req.session = null;
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 1000,
    })
    .redirect(`${CLIENT_URL}`);
};

exports.loginFailedOauth = (req, res) => {
  return res.redirect(`/auth/logout`);
};

exports.logoutOauth = (req, res) => {
  req.session = null;
  return res.redirect(`${CLIENT_URL}/login`);
};
