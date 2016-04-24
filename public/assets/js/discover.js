// List of discover URL's
var boston_urls = ['https://www.youtube.com/embed/0ocWmZ2JxFo', 'https://www.youtube.com/embed/soAWihvfmR4', 'https://www.youtube.com/embed/CI4TMwFqEgA', 'https://www.youtube.com/embed/e78_3GnH_1I', 'https://www.youtube.com/embed/U3hGDfur4Ec', 'https://www.youtube.com/embed/uj26D-bZ4oo', 'https://www.youtube.com/embed/mF6IYcgwHHY', 'https://www.youtube.com/embed/9c1i7id2zdE', 'https://www.youtube.com/embed/KRMHrUvFSbs'];
var lowell_urls = ['https://www.youtube.com/embed/WJkItLf3XqE', 'https://www.youtube.com/embed/NbB5F4U3eiY', 'https://www.youtube.com/embed/2O_1DYjQNoU', 'https://www.youtube.com/embed/jASmF2nsBEI', 'https://www.youtube.com/embed/j9qFvdF5D58', 'https://www.youtube.com/embed/S2UfGtHCH2s'];
var streams = {'boston': boston_urls, 'lowell': lowell_urls}

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

});
