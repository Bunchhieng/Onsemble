var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
require('../models/db');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({
      email: username.toLowerCase()
    }, function(err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, {
          msg: 'Incorrect username'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          msg: 'Incorrect password'
        });
      }
      return done(null, user);
    });
  }
));
