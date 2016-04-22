var mongoose = require('mongoose');
var UserSchema = mongoose.model('User');

/**
 * Helper function to send response, status code and content
 * @param {String} res
 * @param {Number} status - status code
 * @param {String} content
 */
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.home = function(req, res) {
  UserSchema.find({}, function(err, data) {
    if (err) console.log(err);
    res.render('index', {
      results: data
    });
  });
}

module.exports.stage = function(req, res) {
  var user = req.baseUrl.slice(1);
  UserSchema.find({}, function(err, data) {
    if (err) console.log(err);
    res.render('stage', {
      data: data
    });
  });
}

module.exports.discover = function(req, res) {
  UserSchema.find({}, function(err, data) {
    if (err) console.log(err);
    res.render('discover', {
      data: data
    });
  });
}

module.exports.upload = function(req, res) {
  res.render('upload', {});
}

module.exports.login = function(req, res) {
  res.render('login', {});
}
