var express = require('express');
var router = express.Router();
var mainCtrl = require('../controllers/main');

// Database connection handler
require('../models/db');
var UserSchema = require('../models/User');
/* Locations pages */
router.get('/', function(req, res, next) {
  UserSchema.find({}, function(err, data) {
    if (err) console.log(err);
    res.render('index', {
      results: data
    });
  });
});

module.exports = router;
