var twitterAPI_config = require('./twitterAPI_config');
var Twit = require('twit');
var u = require("./utils");

function twitter_conn() {
    // Retrieving consumer_key, consumer_secret, access_token and access_token_secret
    var T = new Twit(twitterAPI_config);
    return T
}

function twitter_retrieve(T, keyword, callback = (results) => {}) {
    T.get('search/tweets', { q: keyword, count: 3, lang: 'en'}, function(err, data, response) {
        var tweet_array = [];
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            tweet_object = {
                id: u.randomString(12),
                title: "Tweet about "+keyword,
                author: tweets[i].user.name,
                content: tweets[i].text,
                posted: tweets[i].created_at,
                source: "Twitter"};
            tweet_array.push(tweet_object);
        }
        console.log(tweet_array);
        callback(tweet_array);
    });
}

module.exports = {'twitter_conn':twitter_conn,'twitter_retrieve':twitter_retrieve}