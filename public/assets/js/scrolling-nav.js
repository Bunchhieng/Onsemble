/*!
 * File: /~sparedes/WEB-INF/js/scrolling-nav.js
 * Santiago C. Paredes, UMass Lowell Computer Science, sparedes@cs.uml.edu
 * Taken from http://ironsummitmedia.github.io/startbootstrap-scrolling-nav/
 */

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
