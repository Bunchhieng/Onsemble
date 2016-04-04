var express = require('express');
var router = express.Router();
// Database connection handler
require('../models/db');
var UserSchema = require('../models/User');

router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('discover', {});
=======
  UserSchema.find({} , function(err, data) {
    if (err) console.log(err);
    res.render('discover', {
      data: data
    });
  });
>>>>>>> 2b040f65aea96c683bcdafa9d26173f6b13a038e
});

module.exports = router;
