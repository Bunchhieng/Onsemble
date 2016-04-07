var mongoose = require('mongoose'),
  crypto = require('crypto'),
  // Lib to help you hash passwords.
  bcrypt = require('bcrypt-nodejs');

/**
 * bsoth 02/16/2016 Tuesday
 *
 * To simplify our complexity and use more time on the UI, I implemented a User
 * Schema which store user info..etc. The videos, followers and following will be
 * dummy data.
 */
var UserSchema = new mongoose.Schema({
  _id: String,
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
  resetPasswordExpires: Date
});

/**
 * Password hash middleware.
 * Thanks to https://github.com/sahat/hackathon-starter/blob/master/models/User.js
 */
// UserSchema.pre('save', function(next) {
//   var user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });
/**
 * Helper method for validating user's password.
 */
UserSchema.methods.comparePassword = function(canidatePassword, cb) {
  bcrypt.compare(canidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
}

/**
 * Helper method for getting user's gravatar
 */
UserSchema.methods.gravatar = function(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  }
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}

/**
 * Test data for sign in page
 */
var test = mongoose.model('User', UserSchema);
var bun = new test({
  _id: "",
  username: "Bunchhieng",
  email: "Bun@test.com",
  password: "test",
  profile: {
    name: "Bunchhieng Soth",
    gender: "MALE",
    picture: "https://pbs.twimg.com/profile_images/529291042571313153/_lamCsdh.jpeg",
    location: "Seuol, Korea",
    videos: [
      "https://www.youtube.com/embed/FZ2hcYlRupM",
      "https://www.youtube.com/embed/rOjHhS5MtvA",
      "https://www.youtube.com/embed/NHVE_GEBFwM",
      "https://www.youtube.com/embed/0H7aV1XckCo",
      "https://www.youtube.com/embed/6h5OgqqSYw4",
      "https://www.youtube.com/embed/TlI_2nsAxPc",
      "https://www.youtube.com/embed/l0rQFh-dG7s",
      "https://www.youtube.com/embed/tIx6_Z5v88k",
      "https://www.youtube.com/embed/L98SQRHVdEY"
    ],
    followers: 377296,
    followings: 276841
  }
});
bun.save(function(err, data) {
  if (err) console.log(err);
});

var santi = new test({
  _id: "",
  username: "Santiago",
  email: "Santi@test.com",
  password: "test",
  profile: {
    name: "Santiago Paredes",
    gender: "MALE",
    picture: "https://pbs.twimg.com/profile_images/529291042571313153/_lamCsdh.jpeg",
    location: "Shanghai, China",
    videos: [
      "https://www.youtube.com/embed/FZ2hcYlRupM",
      "https://www.youtube.com/embed/rOjHhS5MtvA",
      "https://www.youtube.com/embed/NHVE_GEBFwM",
      "https://www.youtube.com/embed/0H7aV1XckCo",
      "https://www.youtube.com/embed/6h5OgqqSYw4",
      "https://www.youtube.com/embed/TlI_2nsAxPc",
      "https://www.youtube.com/embed/l0rQFh-dG7s",
      "https://www.youtube.com/embed/tIx6_Z5v88k",
      "https://www.youtube.com/embed/L98SQRHVdEY"
    ],
    followers: 322,
    followings: 276841
  }
});
santi.save(function(err, data) {
  if (err) console.log(err);
});

module.exports = mongoose.model('User', UserSchema);
