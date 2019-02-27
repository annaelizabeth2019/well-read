var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//for Google OAuth
var passport = require('passport');
//session middleware
var methodOverride = require('method-override');

//load the env vars
require('dotenv').config();

//create the express app
var app = express();

//connect to the MongoDB with Mongoose
require('./config/database');
//configure passport
require('./config/passport');

//require routes
var librariesRoutes = require('./routes/libraries');
// var myLibraryRoutes = require('./routes/my-library');
// var topSellersRoutes = require('./routes/top-sellers.js')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//mount the session middleware
app.use(session({
  secret: 'WDIRocks!',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', librariesRoutes);
// app.use('/my-library', myLibraryRoutes);
// app.use('/', topSellersRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;