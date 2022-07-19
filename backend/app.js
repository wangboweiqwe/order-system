var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const mongodb = require('./bin/mongodb');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

global.salt = 'hcat';
global.mongoUrl = 'mongodb://staticPath:build1472@localhost/infoEntry?authSource=admin';

mongodb();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态文件
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.use(session({
  secret: 'hcat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: global.mongoUrl })
}));
app.use(passport.authenticate('session'));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
// app.use('/', indexRouter);

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
