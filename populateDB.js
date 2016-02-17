var UserSchema = require('./app_server/models/User'),
  cheerio = require('cheerio'), // Use to parse HTML
  mongoose = require('mongoose'),
  request = require('request'); // Use to make a request

/**
 * bsoth 02/16/2016 Tuesday
 *
 * This file is use to populate our database.
 */
var URL = 'https://randomuser.me/api/';
var peopleProfile = [];

// Get 10 random people profile
// We need username, password, email, name, gender, picture, location, videos,
// followers, followings
for (var i = 0; i < 10; i++) {
  request(URL, function(err, response, body) {
    if (err) {
      console.log(err);
    }
    if (!err && response.statusCode == 200) {
      peopleProfile.push(body);
    }
  });
}
