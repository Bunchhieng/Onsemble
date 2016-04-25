// List of discover URL's
var boston_urls = ['https://www.youtube.com/embed/0ocWmZ2JxFo', 'https://www.youtube.com/embed/soAWihvfmR4', 'https://www.youtube.com/embed/CI4TMwFqEgA', 'https://www.youtube.com/embed/e78_3GnH_1I', 'https://www.youtube.com/embed/U3hGDfur4Ec', 'https://www.youtube.com/embed/uj26D-bZ4oo', 'https://www.youtube.com/embed/mF6IYcgwHHY', 'https://www.youtube.com/embed/9c1i7id2zdE', 'https://www.youtube.com/embed/KRMHrUvFSbs'];
var lowell_urls = ['https://www.youtube.com/embed/WJkItLf3XqE', 'https://www.youtube.com/embed/NbB5F4U3eiY', 'https://www.youtube.com/embed/2O_1DYjQNoU', 'https://www.youtube.com/embed/jASmF2nsBEI', 'https://www.youtube.com/embed/j9qFvdF5D58', 'https://www.youtube.com/embed/S2UfGtHCH2s'];
var streams = {
    'trending_now_-_in_boston': boston_urls,
    'top_acoustic_music_-_in_lowell': lowell_urls
}
var stream_holders = ['stream1'];

// function changeStream() {
// 	var selection = document.getElementById('menu');
// 	var selectedValue = selection.options[selection.selectedIndex].value;
// 	// alert(selectedValue);
// 	$(selection).change(function() {
// 		var target = $(this).data('target');
// 		var show = $("option:selected", this).data('show');
// 		$(target).children().addClass('hide');
// 		$(show).removeClass('hide');
// 	});
// }

jQuery(function($) {

    //Preloader
    var preloader = $('.preloader');
    $(window).load(function() {
        preloader.remove();
    });

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

    // for (var i = 0; i < stream_holders.length; i++) {
    // 	stream_menu_element = document.getElementById('stream_menu').children[0];
    // 	$(stream_menu_element).replaceWith(buildStreamMenu(stream_holders[i]));
    // }

    for (var i = 0; i < stream_holders.length; i++) {
        stream_menu_element = document.getElementById('streams').children[0];
        $(stream_menu_element).replaceWith(buildDiscoverStreams(stream_holders[i]));
    }

    // $(document).on('input', 'select.div-toggle', function (){
    // 	var target = $(this).data('target');
    // 	var show = $("option:selected", this).data('show');
    // 	$(target).children().addClass('hide');
    // 	$(show).removeClass('hide');
    // });

    $('select.div-toggle').change(function() {
        var target = $(this).data('target');
        var show = $("option:selected", this).data('show');
        $(target).children().addClass('hide');
        $(show).removeClass('hide');
    });

    function buildStreamMenu(stream_holder) {
        var keys = Object.keys(streams);

        var html = [];
        html.push('<select id="menu" class="div-toggle form-control" data-target="' + stream_holder + '" onchange="changeStream()">');
        html.push('<option value="">Select a stream...</option>');

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            html.push('<option value="' + key + '" data-show=".' + key + '">' + toTitleCase(key) + '</option>');
        }
        html.push('</select>');
        return html.join("");
    }

    function buildDiscoverStreams(stream_holder) {
        var keys = Object.keys(streams);

        var html = [];
        html.push('<div class="' + stream_holder + '">');
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            html.push('<div class="' + key + ' hide"></div>');
        }
        html.push('</div>');
        return html.join("");
    }

    function toTitleCase(str) {
        str = str.replace(/_/g, " ");
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    // http://stackoverflow.com/questions/6164507/change-the-content-of-a-div-based-on-selection-from-drop-down-menu
    $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });
});
