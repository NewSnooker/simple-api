const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const config = require("./config/index");
const passport = require("passport");

mongoose.connect(config.MONGODB_URI).then(() => {
  console.log("connected MongoDB server");
});

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const pageRouter = require("./routes/pageRouter");
// const abcRouter = require("./routes/abc");

var app = express();

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/page1", pageRouter);
// app.use("/abc", abcRouter);

module.exports = app;
