var mongoose = require('mongoose'),
    crypto = require('crypto'),
    // Lib to help you hash passwords.
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken');

/**
 * bsoth 02/16/2016 Tuesday
 *
 * To simplify our complexity and use more time on the UI, I implemented a User
 * Schema which store user info..etc. The videos, followers and following will be
 * dummy data.
 */
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    facebook: String,
    google: String,
    youtube: String,
    profile: {
        name: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        picture: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        videos: [String],
        followers: {
            type: Number,
            default: 0
        },
        followings: {
            type: Number,
            default: 0
        }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    hash: String,
    salt: String
});

// Added on 04/07/2016 bsoth
UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
};

// Export this model as public
module.exports = mongoose.model('User', UserSchema);
var User = mongoose.model('User', UserSchema);
User.findOne({username: "santi"}, function(err, exist) {
  if(exist) {
    return;
  }
  var Santi = new User({
      username: "santi",
      email: "santi@gmail.com",
      profile: {
          name: "Santiago Paredes",
          gender: "Male",
          videos: [
              "https://www.youtube.com/embed/9c1i7id2zdE",
              "https://www.youtube.com/embed/CnWCF3ND09I",
              "https://www.youtube.com/embed/K7k-TmIl3yk"
          ],
          picture: "https://pbs.twimg.com/profile_images/644166746430156800/jGhM-iiv.jpg",
          location: "Lowell, MA",
          followers: 9323843,
          followings: 10
      }
  });

  Santi.save(function(err) {
      if (err) console.log(err);
  });
});
