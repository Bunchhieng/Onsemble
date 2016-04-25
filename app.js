var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var dotenv = require('dotenv');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('express-flash');

// Bring in database
require('./app_server/models/db');
require('./app_server/config/passport');
var UserSchema = require('./app_server/models/User');

// Controllers (route handler)
var userController = require('./app_server/controllers/authentication');
var homeController = require('./app_server/controllers/home');

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
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**********************************************************************
 * Primary app routes
 **********************************************************************/
app.get('/', homeController.index);
app.get('/stage', homeController.stage);
app.get('/stage/:userid', userController.getUser);
app.get('/discover', homeController.discover);
app.get('/following', homeController.following);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/upload', userController.getUpload);
app.get('/forgot', userController.getForgot);
app.post('/register', userController.register);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

console.log('Server is running at port 3000');
module.exports = app;
