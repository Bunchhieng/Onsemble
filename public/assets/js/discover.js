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
