/**
 * bsoth 02/16/2016 Tuesday
 *
 * This file is use to populate our database.
 */

var UserSchema = require('./app_server/models/User');
// Using got to make HTTP request, it's lightweight compare to request
var got = require('got');
var mongoose = require('mongoose');
var moment = require('moment');
var async = require('async');

// Database handler
require('./app_server/models/db');

// Random user API
var URL = 'https://randomuser.me/api/';
// Number of request to randomuser API
var NUM = 40;
// Store all the JSON data from the request.
var results = [];

/**
 * We need:
 * - Username
 * - Email
 * - Password
 * - profile: name, age, gender, picture, location, videos, followers, followings
 */
function generatePeople(r) {
  var o = {};
  o._id = r.results[0].user.username;
  o.username = r.results[0].user.username;
  o.email = r.results[0].user.email;
  o.password = r.results[0].user.password;
  o.profile = {
    name: capitalizeFirstLetter(r.results[0].user.name.first) + ' ' + capitalizeFirstLetter(r.results[0].user.name.last),
    gender: r.results[0].user.gender.toUpperCase(),
    picture: r.results[0].user.picture.medium,
    location: capitalizeFirstLetter(r.results[0].user.location.city) + ', ' + capitalizeFirstLetter(r.results[0].user.location.state),
    videos: [
      'https://www.youtube.com/embed/tR87Jk8ECm0',
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
    // Random number between 1000000 and 10000
    followers: Math.floor(Math.random() * (1000000 - 10000 + 1) + 100000),
    followings: Math.floor(Math.random() * (1000000 - 10000 + 1) + 10000)
  };
  // Get a random string with 3 letters
  o.resetPasswordToken = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  // Use moment to get current data and make a nice format
  o.resetPasswordExpires = moment().add(700, 'days').format('MMMM Do YYYY, h:mm:ss a');
  return o;
}
/**
 * We need to empty the database everytime we populate it to avoid duplicate error
 *
 * @param {Object} db - JSON object
 */
function emptyThenInsert(db) {
  UserSchema.remove({}, function(err) {
    if(err) console.log(err);
    UserSchema.collection.insert(db, function(err, data) {
      if (err) console.log(err);
      UserSchema.collection.find({}, function(err, data) {
        if (err) console.log(err);
      });
      process.exit(1);
    });
  });
}

/**
 * Change the first character to uppercase
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

// Using Promise to get 10 results
runSequence(URL, NUM).then(function(results) {
  console.log(results.length + " documents has been inserted to the database.");
  var db = [];
  for (var i = 0; i < NUM; i++) {
    var result = JSON.parse(results[i]);
    var d = generatePeople(result);
    db.push(d);
  }
  emptyThenInsert(db);
});
