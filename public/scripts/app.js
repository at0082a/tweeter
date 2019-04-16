/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

function createTweetElement (tweet) {
     
return `<article class="tweet"><header><img "src="${tweet.user.avatars.small}" alt="Avatar" class="avatar"></img><h3>${tweet.user.name}</h3></header><p class="body-text"> ${tweet.content.text} </p><footer><p class="footer-text">${tweet.created_at}</p></footer></article>`
     
}

const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }
  
  var $tweet = createTweetElement(tweetData);
  
  console.log($tweet); // to see what it looks like
  $('.tweet-container').append($tweet);

});