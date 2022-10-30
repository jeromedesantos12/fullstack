// IMPORT
require("dotenv").config();
require("./src/config/db");
require("./src/utils/auth/passport");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const AuthRoute = require("./src/routes/AuthRoute");
const StudentRoute = require("./src/routes/StudentRoute");
const UserRoute = require("./src/routes/UserRoute");
const HomeRoute = require("./src/routes/HomeRoute");
const ErrorRoute = require("./src/routes/ErrorRoute");

// SETUP
const app = express();
const { PORT, CLIENT_URL, SESSION_KEY } = process.env;

// COOKIE
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: [SESSION_KEY],
    maxAge: 60 * 1000,
  })
);

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// PARSING DATA API
app.use(express.json());

// IZINKAN CORS
app.use(
  cors({
    origin: [CLIENT_URL],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// REGISTRASI API
app.use("/auth", AuthRoute);
app.use("/student", StudentRoute);
app.use("/user", UserRoute);
app.use("/", HomeRoute);
app.use("*", ErrorRoute);

// KONEKSI SERVER
app.listen(PORT, () => console.log(`Server up and running on :${PORT}...`));
