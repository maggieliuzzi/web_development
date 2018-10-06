function twitter_conn() {
    // Retrieving consumer_key, consumer_secret, access_token and access_token_secret
    var twitterAPI_config = require('./twitterAPI_config');
    var Twit = require('twit');
    var T = new Twit(twitterAPI_config);
    console.log('Started Twitter Bot');
    return T
}

function twitter_retrieve(T) {
    T.get('search/tweets', { q: 'elon musk', count: 3 }, function(err, data, response) {
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].user.name);
            console.log(tweets[i].text);
        }
    })
    console.log('Retrieved Twitter Posts');
    return
}

module.exports = {'twitter_conn':twitter_conn,'twitter_retrieve':twitter_retrieve}