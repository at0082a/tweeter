

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
            <div style="flex-grow:1">
                <img src="${tweet.user.avatars.small}" alt="Avatar" class="avatar"/>
            </div>
            <div style="flex-grow:6">
                <h3>${tweet.user.name} </h3>
            </div>
            <div style="flex-grow:1">
                <p>${tweet.user.handle}</p>
            </div>
            
        </header>
        <p class="body-text">${escape(tweet.content.text)}</p>
        <footer>
            <p class="footer-text">${tweet.created_at}</p>
        </footer>
    </article>`;
}



$(function() {

    $('.tweet-text').keyup(function() {
        $('#compose-tweet').text('Compose Tweet').css('color', 'purple');
    })

    $( "#target" ).submit(function( event ) {
         event.preventDefault();
        if ( !$('.tweet-text').val()) {
            $('#compose-tweet').text('Text Area Cannot Be Empty!').css('color', 'red')
            return
        } else if ($('.tweet-text').val().length > "140") {
            $('#compose-tweet').text('Exceeds 140 Character Limit!').css('color', 'red')
            return
        } 
         var str = $( this ).serialize(); //post request to create tweet
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
        
    $.ajax({ //get request to load tweets from the server
        type: 'GET',
        url: '/tweets',
        success: function(tweets) {
            $('.tweet-container').empty();
            renderTweets(tweets);
        }
    });
    
}

function renderTweets(tweets) { //to add a new tweet at the top of the list
  for (let tweet of tweets) {
        $('.tweet-container').prepend(createTweetElement(tweet)); //prepend adds to top
    }
  }   

$(document).ready(function() {

$( ".new-tweet" ).hide() //hides the compose tweet box when the page loads
$(".nav-button").click(function(){
    $(".new-tweet").toggle(500); //makes the compose box visible
    $( ".tweet-text" ).select(); //selects the text area to type when compose tweet slides into view
});

loadTweets();

});

// loadTweets()
