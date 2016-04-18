/**
 * justin nguyen 04/18/2016 
 */

/*We need: 
    video title,
    video url,
    video description,
    music genre
*/

var mongoose = require('mongoose');

var DiscoverSchema = new mongoose.Schema({
    genre: String,
    video: {
        title: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            required: true
        }
        description: {
            type: String,
            default: ''
        },
    }
});


// Export this model as public
module.exports = mongoose.model('Discover', DiscoverSchema);