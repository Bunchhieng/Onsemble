
/* This function require a YouTube url and return a YouTube video ID
 */
function youtube_parser(url) {
    var match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
    return (match && match[7].length == 11) ? match[7] : false;
}

/* This function requires a YouTube video ID and return an embeded YouTube url.
 * With below conditions:
 * autoplay=1 - autoplay the video once the video is buffea
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
    return "http://www.youtube.com/embed/" + videoID + "?autoplay=1&start=21&end=37&showinfo=0&controls=0&disablekb=1&rel=0";
}

/* Add youtube to given div id
 * notice id with hash tag
 */

function youtubeDiv(div_ID, VIDEOID, width, height) {
    // getting youtube url
    var url = youtubeEmbededURL(VIDEOID);

    // object
    var object = document.createElement('iframe');

    object.id = VIDEOID;
    object.src = url;
    object.width = width;
    object.height = height;
    object.allowfullscreen;

    // appending the object tag to required div
    $(div_ID).append(object);
}

function imgFrame(div_ID, VIDEOID, width, height) {
    //mine
    var iframe = $('iframe:first');
    var iframe_src = iframe.attr('src');
    var youtube_video_id = VIDEOID;
    //end
    //if (youtube_video_id.length == 11) {
    var video_thumbnail = 'http://img.youtube.com/vi/' + youtube_video_id + '/0.jpg';
    //$('body').append(video_thumbnail);
    //}
    var object = document.createElement('img');

    object.id = VIDEOID;
    object.src = video_thumbnail;
    object.width = width;
    object.height = height;
    // hover on image to play video
    object.onclick = function() {
        object.remove();
        youtubeDiv(div_ID, VIDEOID, width, height);
    };

    $(div_ID).append(object);
}

/* Request the url */
function retrInfoFromVideoID(VIDEOID) {
    // url for retreiving data
    var url = "https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet"

    var vid = "&id=" + VIDEOID;
    // required API key for v3: AIzaSyCSF8SnzxmLgor11z8dtzaPLmXt1l5WX-k
    // from takyiulo@gmail.com
    var API_KEY = "&key=" + "AIzaSyCSF8SnzxmLgor11z8dtzaPLmXt1l5WX-k";

    return url + vid + API_KEY;
}

/* Request the info, client side
 * This is what it looks like:
 * https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=4Y4YSpF6d6w&key=AIzaSyCSF8SnzxmLgor11z8dtzaPLmXt1l5WX-k
 */
function requestInfo(VIDEOID) {
    var xmlhttp = new XMLHttpRequest();
    var url = retrInfoFromVideoID(VIDEOID);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            console.log("Request data" + JSON.stringify(myArr));
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/* Request the info, server side 
 * npm install request 
 */
function RrequestInfo(VIDEOID) {
    var request = require('request');
    request(retrInfoFromVideoID(VIDEOID), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
        }
    });
}