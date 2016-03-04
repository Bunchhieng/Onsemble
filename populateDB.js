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
// Database handler
require('./app_server/models/db');

// Random user API
var URL = 'https://randomuser.me/api/';
// Number of request to randomuser API
var NUM = 20;
// Store all the JSON data from the request.
var results = [];

/**
 * This function require a YouTube link and return a YouTube video ID
 *
 * @return {String} ID - Youtube video ID
 */
function youtube_parser(url) {
  var match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
  return (match && match[7].length == 11) ? match[7] : false;
}

/**
 * This function requires a YouTube video ID and return an embeded YouTube url.
 * With below conditions:
 * autoplay=1 - autoplay the video once the video is buffed
 * start=0&end=15 - show the first 15 seconds of the embed video
 * showinfo=0 - show NO information such as title
 * controls=0 - show NO player controls
 * disablekb=1 - disable keyboard
 * rel=0 - show no relevance video after video is done
 * However, disabling showinfo and controls will result in showing a YouTube
 * logo on the lower right corner of the video. This logo can't not be remove
 * otherwise it will violate YouTube terms
 */
function youtubeEmbededURL(videoID) {
  return "http://www.youtube.com/embed/" + videoID +
    "?autoplay=1&start=0&end=15&showinfo=0&controls=0&disablekb=1&rel=0";
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
  o._id = r.results[0].user.username;
  o.username = r.results[0].user.username;
  o.email = r.results[0].user.email;
  o.password = r.results[0].user.password;
  o.profile = {
    name: r.results[0].user.name.first + ' ' + r.results[0].user.name.last,
    gender: r.results[0].user.gender,
    picture: r.results[0].user.picture.medium,
    location: r.results[0].user.location.street + ', ' + r.results[0].user.location.city + ', ' + r.results[0].user.location.state + ', ' + r.results[0].user.location.zip,
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

// Using Promise to get 10 results
runSequence(URL, NUM).then(function(results) {
  console.log(results.length + " documents has been inserted to the database.");
  var db = [];
  for (var i = 0; i < 10; i++) {
    var result = JSON.parse(results[i]);
    var d = generatePeople(result);
    db.push(d);
  }
  emptyThenInsert(db);
  process.exit(1);
});
