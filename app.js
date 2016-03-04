var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Bring in database
require('./app_server/models/db');
var UserSchema = require('./app_server/models/User');

var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var test = require('./app_server/routes/test');
var discover = require('./app_server/routes/discover');
var stage = require('./app_server/routes/stage');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
<<<<<<< HEAD
app.use('/test', test);
=======
app.use('/discover', discover);
app.use('/stage', stage);
>>>>>>> b9b2e3cf7da891bb8d73a31419dddc242df6e1f9
/**
 * Onsemble RESTFul API
 *
 * /api/:userid/discover/ -
 * /api/:userid -
 */
// Get all users
app.use('/api/users/', function(req, res) {
  UserSchema.find({}, function(err, result) {
    if (err) console.log(err);
    res.json(result);
  });
});

// Get specific user
app.use('/api/:userid/', function(req, res) {
  var id = req.params.userid;
  UserSchema.find({
    _id: id
  }, function(err, result) {
    if (err) console.log(err);
    res.json(result);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log('Server is running at port 3000');
module.exports = app;
