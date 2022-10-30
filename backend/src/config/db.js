// IMPORT
require("dotenv").config();
const { DB } = process.env;
const mongoose = require("mongoose");

// SETUP
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// KONEKSI DB
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));
