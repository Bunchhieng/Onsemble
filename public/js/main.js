$(document).ready(function() {
  // Log in form
  $(".email-signup").hide();
  $("#signup-box-link").click(function() {
    $(".email-login").fadeOut(100);
    $(".email-signup").delay(100).fadeIn(100);
    $("#login-box-link").removeClass("active");
    $("#signup-box-link").addClass("active");
  });
  $("#login-box-link").click(function() {
    $(".email-login").delay(100).fadeIn(100);;
    $(".email-signup").fadeOut(100);
    $("#login-box-link").addClass("active");
    $("#signup-box-link").removeClass("active");
  });
  loadPlayer();
});

/**
 * Hover to play Youtube videos
 */
function loadPlayer() {
  if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYoutubeIframeAPIReady = function() {
      onYoutubeIframeAPIReady();
    };
  } else {
    onYoutubeIframeAPIReady();
  }
}

function onYoutubeIframeAPIReady() {
  // Get all Iframe elements
  var videos = $('iframe');
  // Array to stock each videos youtube instance class
  var players = [];
  // Stock the current playing video
  var playingID = null;
  for (var i = 0, len = videos.length; i < len; i++) {
    // Get the Iframe ID
    var currentIframeID = videos[i].id;
    // Stock in the array the instance
    players[currentIframeID] = new YT.Player(currentIframeID);
    videos[i].onmouseover = function(e) {
      var currentHoveredElement = e.target;
      if (playingID) {
        players[playingID].pauseVideo();
      }
      players[currentHoveredElement.id].playVideo();
      playingID = currentHoveredElement.id;
    }
  }
}
