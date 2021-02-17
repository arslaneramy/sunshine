require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");


const handlebars = require("hbs");

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventRouter = require('./routes/events');
const authRouter = require("./routes/auth");
const siteRouter = require("./routes/site")

const { isLoggedIn } = require('./utils/middleware');
const app = express();

// function isLoggedIn(req, res, next) {
//   if (req.session.currentUser){
//     next();
//   }
//   else {
//     res.redirect("/auth/login");
//   }
// }

// DB CONNECTION
mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the DB"))
  .catch((err) => console.log(err));


// const MONGODB_URI = process.env.MONGODB_URI;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET,
  // cookie: { maxAge: 3600000 * 1 },	// 1 hour
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 24 * 7 // Time to live - 7 days (14 days - Default)
  })
}));

// MAIN ROUTE
app.use("/", indexRouter);


app.use("/users", usersRouter);
app.use("/events", eventRouter);
app.use("/auth", authRouter);

// helper middleware (commented)
// function isLoggedIn (req, res, next) {
//   if (req.session.currentUser){
//     next();
//   } else {
//     res.redirect('/auth/login');
//   }

// }



app.use("/", siteRouter);

//ERROR HANDLERS
//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log('ERROR', err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

