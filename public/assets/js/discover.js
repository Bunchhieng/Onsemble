jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function(){
		preloader.remove();
	});

	// Menu	
	$('#header .nav-button').on('click',function(){
		$('#navigation').fadeIn();
	});

	$('#hidemenu').on('click', function(){
		$('#navigation').fadeOut();
	});

	$('.main-nav ul li a').on('click', function(){
		$('#navigation').fadeOut();
	});

	$('select.div-toggle').change(function() {
		console.log('here toggle');
		var target = $(this).data('target');
		var show = $("option:selected", this).data('show');
		$(target).children().addClass('hide');
		$(show).removeClass('hide');
	});

	// List of discover URL's
	var boston_urls = ['https://www.youtube.com/embed/V0Gzsdmp3Yc', 'https://www.youtube.com/embed/1s9Xs6wEZHc', 'https://www.youtube.com/embed/CI4TMwFqEgA', 'https://www.youtube.com/embed/NHVE_GEBFwM', 'https://www.youtube.com/embed/0H7aV1XckCo', 'https://www.youtube.com/embed/6h5OgqqSYw4', 'https://www.youtube.com/embed/l0rQFh-dG7s', 'https://www.youtube.com/embed/9c1i7id2zdE', 'https://www.youtube.com/embed/tIx6_Z5v88k'];
	var lowell_urls = ['https://www.youtube.com/embed/J079e95caB4', 'https://www.youtube.com/embed/jASmF2nsBEI', 'https://www.youtube.com/embed/CnWCF3ND09I', 'https://www.youtube.com/embed/XO1bQ5JSYcY', 'https://www.youtube.com/embed/T-oJCNiiLCQ', 'https://www.youtube.com/embed/S2UfGtHCH2s']

	// Dict of streams
	var streams = {'boston': boston_urls, 'lowell': lowell_urls};

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
	// Need to limit how many layers of a stream are made based on how many
	// videos are in list
	function buildStream(streamName, url_list) {

		var html = [];
		var i = 0;

		buildCarousel(streamName);
		buildLayer(streamName, 'active');
		buildLayer(streamName, '');
		buildLayer(streamName, '');
		buildDataSliders(streamName);

		return html.join("");

		// Builder functions
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
	// loop through the stream names, build them, and place their content on the page
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		tempStream = buildStream(key, streams[key]);
		replaceContentInContainer(key, tempStream);
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

	//Contact Form
	var form = $('#contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('.form-status');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form_status.find('.form-status-content').html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn();
			}
		}).done(function(data){
			form_status.find('.form-status-content').html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});


});

	// var slider = $('#page-slider .carousel-inner').find('.item');
	// $('#page-slider').on('slid.bs.carousel', function () {
	// 	var curIndex 	= slider.filter('.active').index();
	// 	var menuItems 	= $('.main-nav ul').find('li');
	// 	menuItems.removeClass('active').eq(curIndex).addClass('active');
	// });

	// var slider2 = $('#page-slider2 .carousel-inner').find('.item');
	// $('#page-slider2').on('slid.bs.carousel', function () {
	// 	var curIndex 	= slider.filter('.active').index();
	// 	var menuItems 	= $('.main-nav ul').find('li');
	// 	menuItems.removeClass('active').eq(curIndex).addClass('active');
	// });


	// http://stackoverflow.com/questions/6164507/change-the-content-of-a-div-based-on-selection-from-drop-down-menu
	// $('select.div-toggle').change(function(){
	//   var target = $(this).data('target');
	//   var show = $("option:selected", this).data('show');
	//   $(target).children().addClass('hide');
	//   $(show).removeClass('hide');
	// });

	// var myCarousel = $('#myCarousel').html();
	// var test = $('.boston').html(myCarousel)
	// var myCarousel2 = $('#myCarousel2').html();
	// var test2 = $('.lowell').html(myCarousel)