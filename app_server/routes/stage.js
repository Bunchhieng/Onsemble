var express = require('express');
var router = express.Router();
// Database connection handler
require('../models/db');
var UserSchema = require('../models/User');

router.get('/', function(req, res, next) {
  var user = req.baseUrl.slice(1);
  console.log(user);
  UserSchema.find({
    _id: "beautifulbird243"
  }, function(err, data) {
    if (err) console.log(err);
    console.log(data);
    res.render('stage', {
      data: data
    });
  });
});
module.exports = router;
