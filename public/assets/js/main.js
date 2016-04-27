// Carousel Auto-Cycle
$(document).ready(function() {
    $('.carousel').carousel({
        interval: 0
    })
    // Menu
    $('#header .nav-button').on('click', function() {
        $('#navigation').fadeIn();
    });

    $('#hidemenu').on('click', function() {
        $('#navigation').fadeOut();
    });

    $('.main-nav ul li a').on('click', function() {
        $('#navigation').fadeOut();
    });

});
