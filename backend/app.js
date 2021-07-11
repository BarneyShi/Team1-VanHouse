var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

/* ENV Variables */
require("dotenv").config();

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));

// CITATION: I found the syntax to increase the size of req.body here: https://stackoverflow.com/a/19965089
app.use(express.json({limit: '6mb'}));
app.use(express.urlencoded({limit: '6mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/* Connect to Mongo Atlas */
/* CITATION: https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i */
const url = `mongodb+srv://m001-student:${process.env.MONGO_PASSWORD}@sandbox.vsrq0.mongodb.net/vanhouse?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to Mongo Atlas!");
  })
  .catch((err) => {
    console.log("Failed to connect to Mongo Atlas. ", err);
  });

module.exports = app;
