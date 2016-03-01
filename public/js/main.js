$(document).ready(function() {
  $.getJSON('/api/users/', function(data) {
    // Set to where you want to put the JSON
    // i.e: $('.container').html(data);
  });
});
