const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
dotenv.config();

// Define routes
let index = require("./routes/index");
let image = require("./routes/image");
const config = require("./_config");

// Initializing the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// connecting the database
async function connectdb() {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.log("Error connecting to the database. \n" + err);
    });
}

// test if the database has connected successfully
let db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected successfully");
});

// View Engine
app.set("view engine", "ejs");

// Set up the public folder;
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(express.json());

app.use("/", index);
app.use("/image", image);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
  await connectdb();
});

module.exports = app;
