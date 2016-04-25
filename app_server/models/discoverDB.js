/**
 * justin nguyen 04/18/2016
 */

/**
 We need:
 video title,
 video url,
 video description,
 music genre
 */
var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
    title: String,
    url: String,
    description: String
});

var DiscoverSchema = new mongoose.Schema({
    genre: String,
    videos: [VideoSchema]
});

// Export this model as public
module.exports = mongoose.model('Discover', DiscoverSchema);