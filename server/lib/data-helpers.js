"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(tweet, callback) {
    db.collection("Tweeter").insertOne(tweet,(err, result ) => {

      if (err) {
        callback(err);
      }
        console.log("successful saving of new tweet")
        // db.tweets.push(newTweet);
        callback(null, result);
      })
  
    },

    
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("Tweeter").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    }

  };
}
