// IMPORT
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const StudentRoute = require("./src/routes/StudentRoute");
const UserRoute = require("./src/routes/UserRoute");
const HomeRoute = require("./src/routes/HomeRoute");
const ErrorRoute = require("./src/routes/ErrorRoute");

// SETUP
const app = express();
const port = 8080;

// PARSING DATA API
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IZINKAN CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// REGISTRASI API
app.use("/student", StudentRoute);
app.use("/user", UserRoute);
app.use("/", HomeRoute);
app.use("*", ErrorRoute);

// KONEKSI SERVER
app.listen(port, () => console.log(`Server up and running on :${port}...`));

// KONEKSI DB
mongoose.connect("mongodb://127.0.0.1:27017/collage", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));
