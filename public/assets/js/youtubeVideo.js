/*****************************************************************************
 * Notice some function might not be used.
 ****************************************************************************/

/* This function require a YouTube url and return a YouTube video ID */
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
    return "http://www.youtube.com/embed/" + videoID + "?autoplay=1&start=0&end=15&showinfo=0&controls=0&disablekb=1&rel=0";
}

/* It will replace given div to iframe.
 * Two things noted:
 *    It will REPLACE the given div with iframe.
 *    It ONLY works with id.
 */
function youtubeDiv(parent_div_ID, div_ID, VIDEOID, width, height) {
    // create and replace div_ID to iframe with parameters
    var player = new YT.Player(div_ID, {
        width: width,
        height: height,
        videoId: VIDEOID,
        playerVars: { 
            autoplay: 1,
            start: 0,
            end: 600,
            showinfo: 0,
            controls: 0,
            disablekb: 1,
            rel: 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
    // When player is not ready, it will know if the mouse
    // is inside the frame or not.
    var OutOfFrameBeforeReady = true;
    // on hover
    $(parent_div_ID).mouseover(function() {
        OutOfFrameBeforeReady = false;
    });
    // on out of element
    $(parent_div_ID).mouseout(function() {
        OutOfFrameBeforeReady = true;
    });

    // When player is ready, the API will call this function
    // pauseVideo() or playVideo() will only works inside these functions
    function onPlayerReady(event) {
        console.log("onPlayerReady");

        player.playVideo();
        // if the mouse is out of frame before player is ready.
        if(OutOfFrameBeforeReady) {
            // load in the first 100 milliseconds of video instead of a
            // continuous loading circle icon
            setTimeout(function() {
                player.pauseVideo();
            }, 100);
        }

        // on hover
        $(parent_div_ID).mouseover(function() {
            console.log("in2");
            player.playVideo();
        });
        // on out of element
        $(parent_div_ID).mouseout(function() {
            console.log("out2");
            player.pauseVideo();
        });
    }
}

/* imgFrame is the image before replace the div into iframe.
 * For now, the thumbnail is the image.
 * Also, only id are allowed.
 */
function imgFrame(div_ID, VIDEOID, width, height) {
    var object = document.createElement('img');

    object.id = VIDEOID;
    object.src = "http://img.youtube.com/vi/" + VIDEOID + "/0.jpg";
    object.width = width;
    object.height = height;

    // hover play required a wrap <div> because
    // before the player is ready, it will unable to detect hover
    $("#"+div_ID).wrap("<div id='iframe_"+ div_ID +"'></div>");
    // hover depend on this css
    $("#"+div_ID).css("display", "flex");
    $("#iframe_"+div_ID).css("display", "inline-block");

    // debugging code
    $("#"+div_ID).css("border", "solid blue");
    $("#iframe_"+div_ID).css("border", "solid red");

    // append image to div
    $("#"+div_ID).append(object);

    // hover on image to play video
    object.onmouseover = function() {
        object.remove();
        youtubeDiv("#iframe_"+div_ID, div_ID, VIDEOID, width, height);
    };
}

/* Return the url of youtube informations with this videoId */
function retrInfoUrlFromVideoID(VIDEOID) {
	// url for retreiving data
	var url = "https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet"

	var vId = "&id=" + VIDEOID;
	// required API key for v3: AIzaSyCSF8SnzxmLgor11z8dtzaPLmXt1l5WX-k
	// from takyiulo@gmail.com
	var API_KEY = "&key=" + "AIzaSyCSF8SnzxmLgor11z8dtzaPLmXt1l5WX-k";

	return url + vId + API_KEY;
}

/* Request the informations of a youtube video.
 * An Example of a JSON structure for informations:
 * https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=4Y4YSpF6d6w&key=AIzaSyCSF8SnzxmLgor11z8dtzaPLmXt1l5WX-k
 */
function requestInfo(VIDEOID, callback) {
	var xmlhttp = new XMLHttpRequest();
	var url = retrInfoUrlFromVideoID(VIDEOID);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    		var body = JSON.parse(xmlhttp.responseText);
    		callback(body);
    	} else {
			console.log(xmlhttp.statusText, xmlhttp.status);
		}
	};

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}