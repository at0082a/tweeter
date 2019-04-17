

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

function createTweetElement (tweet) {
   return `<article class="tweet">
        <header>
            <img src="${tweet.user.avatars.small}" alt="Avatar" class="avatar"/>
            <h3>${tweet.user.name}</h3>
            <p> ${tweet.user.handle} <p>
        </header>
        <p class="body-text">${escape(tweet.content.text)}</p>
        <footer>
            <p class="footer-text">${tweet.created_at}</p>
        </footer>
    </article>`;
}

$(function() {
  
    $( "#target" ).submit(function( event ) {
         event.preventDefault();
        if ( !$('.tweet-text').val()) {
            alert('The text field can not be left blank');
            return
        } else if ($('.tweet-text').val().length > "140") {
            alert('You cannot exceed 140 characters. Please reduce the size of your tweet')
            return
    }
         var str = $( this ).serialize();
         $.ajax({
                  type: 'POST',
                  url: "/tweets",
                  data: str,
                  success : (function() {
                     loadTweets();
                     $('#target').trigger("reset");
                  })
                
      });
    });
  });

function loadTweets () {
        
    $.ajax({
        type: 'GET',
        url: '/tweets',
        success: function(tweets) {
            renderTweets(tweets);
        }
    });
    
}

function renderTweets(tweets) {
  for (let tweet of tweets) {
        $('.tweet-container').prepend(createTweetElement(tweet));
    }
  }   

$(document).ready(function() {

$( ".new-tweet" ).hide()
$(".nav-button").click(function(){
    $(".new-tweet").toggle(500);
    $( ".tweet-text" ).select();
});

loadTweets();

});

// loadTweets()
