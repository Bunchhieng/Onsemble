var express = require('express');
var router = express.Router();

// Database connection handler
require('../models/db');
var UserSchema = require('../models/User');

router.get('/', function(req, res, next) {
  UserSchema.find({}, function(err, data) {
    if (err) console.log(err);
    res.render('test', {
      results: data
    });
  });
});

module.exports = router;
