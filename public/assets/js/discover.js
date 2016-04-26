// List of discover URL's
var boston_urls = ['https://www.youtube.com/embed/0ocWmZ2JxFo', 'https://www.youtube.com/embed/soAWihvfmR4', 'https://www.youtube.com/embed/CI4TMwFqEgA', 'https://www.youtube.com/embed/e78_3GnH_1I', 'https://www.youtube.com/embed/U3hGDfur4Ec', 'https://www.youtube.com/embed/uj26D-bZ4oo', 'https://www.youtube.com/embed/mF6IYcgwHHY', 'https://www.youtube.com/embed/9c1i7id2zdE', 'https://www.youtube.com/embed/KRMHrUvFSbs'];
var lowell_urls = ['https://www.youtube.com/embed/WJkItLf3XqE', 'https://www.youtube.com/embed/NbB5F4U3eiY', 'https://www.youtube.com/embed/2O_1DYjQNoU', 'https://www.youtube.com/embed/jASmF2nsBEI', 'https://www.youtube.com/embed/j9qFvdF5D58', 'https://www.youtube.com/embed/S2UfGtHCH2s'];
var ny_urls = ['https://www.youtube.com/embed/KzARx0EuDgc','https://www.youtube.com/embed/pgPSSgP6zzA','https://www.youtube.com/embed/pWWX0aUW_HY','https://www.youtube.com/embed/YjJmgIW748k','https://www.youtube.com/embed/dApr9iHh3yk','https://www.youtube.com/embed/UE6a_nGUztA'];
var sf_urls = ['https://www.youtube.com/embed/ZQNPiOn_1jw', 'https://www.youtube.com/embed/_as_IxjD3Oo', 'https://www.youtube.com/embed/xKxsX9TCB_I', 'https://www.youtube.com/embed/1C816p-KTNk', 'https://www.youtube.com/embed/aOSrAc-4OZc', 'https://www.youtube.com/embed/_y0BbwXXrjg']
var onsemble_urls = ['https://www.youtube.com/embed/uJXgJ2TGPXg', 'https://www.youtube.com/embed/nsSCl8UXlrY', 'https://www.youtube.com/embed/hos6QhJ9a_U', 'https://www.youtube.com/embed/6OtzUfSYiQ8', 'https://www.youtube.com/embed/Jnm4UMEQFyc', 'https://www.youtube.com/embed/rDWuqrJAyGw']

var streams = {
    'top_acoustic_music_-_in_lowell': lowell_urls,
    'top_indie_music_-_in_new_york': ny_urls,
    'top_country_music_-_in_san_fransisco': sf_urls,
    'trending_now_-_in_boston': boston_urls,
    'featured_artist': onsemble_urls
}
var stream_keys = Object.keys(streams);

var following = false;

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

	stream_menu_element = document.getElementById('stream_table');
    stream_table = buildStreamTable(stream_keys);
    $(stream_menu_element).replaceWith(stream_table);

    for (var i = 0; i < stream_keys.length; i++) {
        stream_element = document.getElementById(stream_keys[i]);
        $(stream_element).replaceWith(buildDiscoverStreams(stream_keys[i]));
    }

    // $(document).on('input', 'select.div-toggle', function (){
    // 	var target = $(this).data('target');
    // 	var show = $("option:selected", this).data('show');
    // 	$(target).children().addClass('hide');
    // 	$(show).removeClass('hide');
    // });

    // $('select.div-toggle').change(function() {
    //     var target = $(this).data('target');
    //     var show = $("option:selected", this).data('show');
    //     $(target).children().addClass('hide');
    //     $(show).removeClass('hide');
    // });

    function buildStreamTable(stream_keys) {
        var html = [];
        var current = ''; // default tab activation

        buildTabs(stream_keys);
        buildTable(stream_keys);
        return html.join("");

        function buildTabs(stream_keys) {
            html.push('<ul class="tabs">');
            for (var i = 0; i < stream_keys.length; i++) {
                buildTab(i, ((i == 0) ? current : ''));
            }
            html.push('</ul>');

            function buildTab(tab, current) {
                html.push('<li class="tab-link ' + current + '" data-tab="tab-' + i + '">' + toTitleCase(stream_keys[tab]) + '</li>')
            }
        }

        function buildTable(stream_keys) {
            for (var i = 0; i < stream_keys.length; i++) {
                buildRow(i, ((i == 0) ? current : '')); // i love hook colon operator! Literally the only thing javascript has going for it
                html.push('<div class="row">');
                html.push('<div id="'+ stream_keys[i] +'"></div>');
                html.push('</div>');
                html.push('</div>');
            }

            function buildRow(tab, current) {
                html.push('<div id="tab-'+tab+'" class="tab-content '+current+'">');
            } 
        }
    }

    function buildDiscoverStreams(stream_key) {
        var html = [];
        html.push('<div class="' + stream_key + '">');
        for (var i = 0; i < stream_keys.length; i++) {
            html.push('<div class="' + stream_keys[i] + '"></div>');
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
    $('ul.tabs li').on('click', (function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').fadeOut('slow', function() {});
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
        $("#" + tab_id).fadeIn('slow', function() {});
    }));

    // $('.tabs').tabs().bind('change', function (e) {
    //         $(this).next().hide().fadeIn();
    // });
});
