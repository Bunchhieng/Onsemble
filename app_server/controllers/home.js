var mongoose = require('mongoose');
var UserSchema = mongoose.model('User');

module.exports.index = function(req, res) {
    res.render('index', {
        title: 'Home'
    });
}

module.exports.stage = function(req, res) {
    UserSchema.find({
        username: "santi"
    }, function(err, data) {
        if (err) console.log(err);
        //if (!data) {
        //    req.flash('errors', {
        //        msg: 'Invalid user in the database.'
        //    });
        //    return res.redirect('/');
        //}
        res.render('stage', {
            user: data,
            title: "Stage"
        });
    })
}


module.exports.discover = function(req, res) {
    UserSchema.find({}).limit(1).exec(function(err, data) {
        if (err) console.log(err);
        //if (!data) {
        //    req.flash('errors', {
        //        msg: 'Invalid user in the database.'
        //    });
        //    return res.redirect('/');
        //}
        res.render('discover', {
            user: data,
            title: "Discover"
        });
    });
}

module.exports.following = function(req, res) {
    res.render('following', {
        title: 'Following'
    });
}
