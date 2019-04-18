$(document).ready(function() {
  var maxLength = 140;
$('.tweet-text').keyup(function() {
  var length = $(this).val().length;
  var length = maxLength-length;

  if (length < 0) {
    $("#counter").text(length).css('color', 'red'); //if textbox exceeds 140 characters, the counter text will turn red.
  }
  else {
    $('#counter').text(length).css('color', '#244751'); // returns to normal color when characters < 140
  } 
  }); 
});


