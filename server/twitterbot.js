console.log('The Twitter bot is starting');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

/*
T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  console.log(data)
})
*/

T.get('search/tweets', { q: 'elon musk', count: 3 }, function(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
    }
})

T.get('users/lookup', { user_id: '1043787486550315000' }, )