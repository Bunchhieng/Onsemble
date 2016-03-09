var express = require('express');
var router = express.Router();
// Database connection handler
require('../models/db');
var UserSchema = require('../models/User');

router.get('/', function(req, res, next) {
  console.log(req.baseUrl);
  var user = req.baseUrl.slice(1);
  UserSchema.find({
    _id : user
  }, function(err, data) {
    if(err) console.log(err);
    console.log(data);
    res.render('stage-test', {
      data: data
    });
  });
});

module.exports = router;
