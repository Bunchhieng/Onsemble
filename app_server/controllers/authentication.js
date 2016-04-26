var passport = require('passport');

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.username) {
        res.render('login', {
            message: "All fields are required."
        });
    }
    var user = new User({
        username: req.body.username,
        email: req.body.email
    });

    user.setPassword(req.body.password);
    User.findOne({
        email: req.body.email
    }, function(err, existingUser) {
        if (existingUser) {
            req.flash('errors', {
                msg: 'Account with that email address already exist.'
            });
            res.redirect('/login');
        }
        user.save(function(err) {
            if (err) {
                req.flash('errors', {
                    msg: 'Some went wrong. Please retry again.'
                });
                return res.redirect('/login');
            }
            console.log(user.username);
            req.logIn(user, function(err) {
                if (err) {
                    req.flash('errors', {
                        msg: 'Couldn\'t log in with the account. Please retry again.'
                    });
                    res.redirect('/login');
                }
                console.log("Inside the login function" + user);
                res.redirect('/discover');
            });
        });
    })(req, res);
};

module.exports.getLogin = function(req, res) {
    if (req.user) {
        return res.redirect('/stage');
    }
    res.render('login', {
        title: 'Login'
    });
};

module.exports.postLogin = function(req, res) {
    if (!req.body.email || !req.body.password) {
        req.flash('errors', errors)
        return res.redirect('/login');
    }

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('errors', info);
            console.log(info);
            res.redirect('/login');
        }
        console.log("OUTSIDE login FUNCTION");
        req.logIn(user, function(err) {
            if (err) {
                return err;
            }
            req.flash('success', {
                msg: 'Success! You are logged in.'
            });
            res.redirect(req.session.returnTo || "/");
        });
    })(req, res);
};

module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

module.exports.getUpload = function(req, res) {
    res.render('upload', {
        'title': 'Upload'
    });
}

module.exports.postUpload = function(req, res) {
    if (!req.body.youtubeLink) {
        res.redirect('/upload');
    }
    User.update({
        "username": "santi"
    }, {
        $push: {
            "profile.videos": req.body.youtubeLink
        }
    }, {
        safe: true
    }, function(err, data) {
        if (err) console.log(err);
        console.log(data);
        res.redirect('/stage');
    });
}

module.exports.getForgot = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('forgot', {
        title: 'Forgot Password'
    });
}

module.exports.getUser = function(req, res, next) {
    var userid = req.params.userid;
    console.log(userid);
    User.find({
        "username": userid
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
        console.log(data);
    });
}
