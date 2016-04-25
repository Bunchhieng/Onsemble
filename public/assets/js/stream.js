// stream.js
jQuery(function($) {


	function setYouTubeTitle(streamName, VIDEOID, id) {
	    requestInfo(VIDEOID, function(body) {
	        document.getElementById(streamName+'title'+id).innerHTML = JSON.stringify(body.items[0].snippet.title).replace(/\"/g, "");
	    });
	}

	function setYouTubeName(streamName, VIDEOID, id) {
        requestInfo(VIDEOID, function(body) {
            document.getElementById(streamName+'name'+id).innerHTML = JSON.stringify(body.items[0].snippet.channelTitle).replace(/\"/g, "");
        });
	}

	function buildStream(streamName, url_list) {
		var html = [];
		var i = 0; // warning! DO NOT USE i AS AN INCREMENTER IN ANY LOOPS
		var numLayers = Math.ceil(url_list.length/3);
		buildCarousel(streamName);
		stackLayers(streamName, numLayers);
		buildDataSliders(streamName);
		return html.join("");

		// Builder and stacking functions
		function buildCarousel(streamName) {
			html.push('<div id="'+streamName+'" class="carousel slide">');
			html.push('<div class="carousel-inner">');
		}

		function buildIFrame(streamName, id) {
			html.push('<li class="col-sm-4">');
			html.push('<div class="video-pad">');
			html.push('<div id="'+streamName+'youtube_video'+id+'"></div>');
			html.push('<div class="title-box">');
			html.push('<h4 id="'+streamName+'name'+id+'"></h4>'); // artist name
			html.push('<p id="'+streamName+'title'+id+'"></p>');
			html.push('</div>');
			html.push('</div>');
			html.push('</li>');
		}

		function stackLayers(streamName, numLayers) {
			buildLayer(streamName, 'active');
			for (var j = 1; j < numLayers; j++) {
				buildLayer(streamName, '');
			}
		}

		function buildLayer(streamName, active) {
			html.push('<div class="item '+active+'">');
			html.push('<ul class="thumbnails">');
			for (var j = 0; j < 3; j++) {			// this is expecting to display groups of 3
				buildIFrame(streamName, i);
				i++;
			}
			html.push('</ul>');
			html.push('</div>');
		}

		function buildDataSliders(streamName) {
			html.push('</div>');	// Close layers
			html.push('<ul class="control-box pager">');
			html.push('<li><a data-slide="prev" href="#'+streamName+'"><i class="fa fa-arrow-left fa-3x"></i></a></li>');
			html.push('<li><a data-slide="next" href="#'+streamName+'"><i class="fa fa-arrow-right fa-3x"></i></a></li>');
			html.push('</ul>');		// Close stream
			html.push('</div>');	// Close stream
		}
	}

	// http://stackoverflow.com/questions/6164507/change-the-content-of-a-div-based-on-selection-from-drop-down-menu
    function replaceContentInContainer(matchClass, content) {
	    var elems = document.getElementsByTagName('*'), i;
	    for (i in elems) {
	        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
	                > -1) {
	            elems[i].innerHTML = content;
	        }
	    }
	};

	// get the names/types of streams
	var keys = Object.keys(streams);

	// loop through the stream names, build them, and place their elements on the page
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		tempStream = buildStream(key, streams[key]);
		replaceContentInContainer(key, tempStream);
		var div = document.getElementsByClassName(key)[0]; // Add the title name above the stream
		div.innerHTML = '<h2>'+ toTitleCase(key) + '</h2>' + div.innerHTML;
	}

	// loop through stream names and place appropriate videos where they belong
    for (var i = 0; i < keys.length; i++) {
    	var key = keys[i];
    	for (var j = 0; j < streams[key].length; j++) {
	        var VIDEOID = youtube_parser(streams[key][j]);
	        setYouTubeTitle(key, VIDEOID, j);
	        setYouTubeName(key, VIDEOID, j);
	        imgFrame(key+"youtube_video"+j, VIDEOID, 340, 240);
	    }
	}

	function toTitleCase(str) {
		str = str.replace(/_/g, " ");
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

});
