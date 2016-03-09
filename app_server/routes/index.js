var express = require('express');
var router = express.Router();

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

// TODO: use only 1 file for route
// router.get('/', ctrOnsemble.home);
// router.get('/stage/:userid', ctrOnsemble.addUser);
// router.get('/stage/:userid', ctrOnsemble.updateUser);
// router.get('/stage/:userid', ctrOnsemble.deleteUser);
// router.get('/discover', ctrOnsemble.discover);

module.exports = router;
