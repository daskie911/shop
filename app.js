const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const session = require("express-session");
require("dotenv").config();

const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const homeRoutes = require("./routes/homeRoutes");

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
// app.use(
//     ({
//         secret: process.env.USERNAME,
//         resave: false,
//         saveUninitialized: false,
//     })
// )

app.use("/", homeRoutes);

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
