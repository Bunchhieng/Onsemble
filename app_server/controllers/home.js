var mongoose = require('mongoose');
var UserSchema = mongoose.model('User');

module.exports.index = function(req, res) {
    res.render('index', {
        title: 'Home'
    });
}

module.exports.stage = function(req, res) {
    UserSchema.findOne({
        username: "crazyduck969"
    }, function(err, data) {
        if (err) console.log(err);
        if (!data) {
            req.flash('errors', {
                msg: 'Invalid user in the database.'
            });
            return res.redirect('/');
        }
        res.render('stage', {
            user: data,
            title: "Stage"
        });
    });
}

module.exports.discover = function(req, res) {
    if(req.user) {
      res.render('discover', {
          title: 'Discover',
          login: true
      });
    } else {
      res.render('discover', {
          title: 'Discover',
          login: false
      });
    }
}

module.exports.following = function(req, res) {
    res.render('following', {
        title: 'Following'
    });
}