var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var dotenv = require('dotenv');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Bring in database
require('./app_server/models/db');
var UserSchema = require('./app_server/models/User');

var index = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var test = require('./app_server/routes/test');
var discover = require('./app_server/routes/discover');
var stage = require('./app_server/routes/stage');
var login = require('./app_server/routes/login');
var upload = require('./app_server/routes/upload');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.load({
  path: '.env.test'
});

// Intitialize express
var app = express();

// Added on 03/09/16 Trying to implement session and cookies
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));

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

// Routing
app.use('/upload', upload);
app.use('/login', login);
app.use('/', index);
app.use('/users', users);
app.use('/test', test);
app.use('/discover', discover);
app.use('/stage', stage);

// Log in and logout logic
app.post('/login', function(req, res) {
  UserSchema.findOne({
    email: req.body.email
  }, function(err, user) {
    if (!user) {
      res.render('login.jade', {
        error: 'Invalid email or password.'
      });
    } else {
      if (req.body.password === user.password) {
        // sets a cookie with the user's info
        req.session.user = user;
        res.redirect('/stage');
      } else {
        res.render('login.jade', {
          error: 'Invalid email or password.'
        });
      }
    }
  });
});
app.get('/stage', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    UserSchema.findOne({
      email: req.session.user.email
    }, function(err, user) {
      if (!user || user.email) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/login');
      } else {
        // expose the user to the template
        res.locals.user = user;
        // render the dashboard page
        res.render('stage.jade');
      }
    });
  } else {
    res.redirect('/login');
  }
});
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});
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
