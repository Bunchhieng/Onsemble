/**
 * bsoth 02/16/2016 Tuesday
 *
 * This file is use to populate our database.
 */

var UserSchema = require('./app_server/models/User');
var got = require('got');
var mongoose = require('mongoose');
// Database handler
require('./app_server/models/db');

var URL = 'https://randomuser.me/api/';
var results = [];

/**
 * Generate future date in format dd/mm/yyyy
 */
function generateDate() {
  var targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 365000000);
  return targetDate;
}
/**
 * We need:
 * - Username
 * - Email
 * - Password
 * - profile: name, age, gender, picture, location, videos, followers, followings
 */
function generatePeople(r) {
  var o = {};
  o.username = r.results[0].user.username;
  o.email = r.results[0].user.email;
  o.password = r.results[0].user.password;
  o.profile = {
    name: r.results[0].user.name.first + ' ' + r.results[0].user.name.last,
    gender: r.results[0].user.gender,
    picture: r.results[0].user.picture.medium,
    location: r.results[0].user.location.street + ', ' + r.results[0].user.location.city + ', ' + r.results[0].user.location.state + ', ' + r.results[0].user.location.zip,
    videos: ['https://www.youtube.com/embed/tR87Jk8ECm0',
      "https://www.youtube.com/embed/1s9Xs6wEZHc",
      "https://www.youtube.com/embed/iPeIXDRa2HE",
      "https://www.youtube.com/embed/rOjHhS5MtvA",
      "https://www.youtube.com/embed/NHVE_GEBFwM",
      "https://www.youtube.com/embed/0H7aV1XckCo",
      "https://www.youtube.com/embed/6h5OgqqSYw4",
      "https://www.youtube.com/embed/TlI_2nsAxPc",
      "https://www.youtube.com/embed/l0rQFh-dG7s",
      "https://www.youtube.com/embed/tIx6_Z5v88k",
      "https://www.youtube.com/embed/L98SQRHVdEY",
      "https://www.youtube.com/embed/mEq317YwrQY",
      "https://www.youtube.com/embed/uj26D-bZ4oo",
      "https://www.youtube.com/embed/LUCtIAAkPh0",
      "https://www.youtube.com/embed/j8cADX87-2I",
      "https://www.youtube.com/embed/sPkhzlIdFAo",
      "https://www.youtube.com/embed/F3WPGtbUlNA",
      "https://www.youtube.com/embed/t_aR9CJlrpk",
      "https://www.youtube.com/embed/Yj4nsZ3o1ag",
      "https://www.youtube.com/embed/Z2OpSIp_hGg",
      "https://www.youtube.com/embed/0E040mYpJDw",
      "https://www.youtube.com/embed/xQlp1fc-mI0",
      "https://www.youtube.com/embed/L_PS8wZNqrc",
      "https://www.youtube.com/embed/IOPpyNRBXCM"
    ],
    followers: Math.floor(Math.random() * (1000000 - 10000 + 1) + 100000),
    followings: Math.floor(Math.random() * (1000000 - 10000 + 1) + 1000)
  };
  o.resetPasswordToken = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  o.resetPasswordExpires = generateDate();
    return o;
}
/**
 * We need to empty the database everytime we populate it to avoid duplicate error
 */
function emptyThenInsert(db) {
  UserSchema.collection.insert(db, function(err, data) {
    if (err) console.log(err);
    UserSchema.collection.find({}, function(err, data) {
      if (err) console.log(err);
    });
  });
}

/**
 * Do n requests to ranmdom user api
 *
 * @param {String} url - API url
 * @param {Number} num - Number of request
 */
function runSequence(url, num) {
  var cntr = 0;
  return new Promise(function(resolve, reject) {
    function checkDone(data) {
      ++cntr;
      results.push(data);
      if (cntr < num) {
        next();
      } else {
        resolve(results);
      }
    }

    function next() {
      got(url).then(response => {
        // console.log(response.body);
        checkDone(response.body);
      }).catch(error => {
        console.log(error.response.body);
        checkDone(null);
      });
    }
    next();
  });
}

runSequence(URL, 10).then(function(results) {
  console.log(results.length);
  var db = [];
  for (var i = 0; i < 10; i++) {
    var result = JSON.parse(results[i]);
    var d = generatePeople(result);
    db.push(d);
  }
  emptyThenInsert(db);
  process.exit(1);
});
