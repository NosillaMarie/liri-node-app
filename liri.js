var second = process.argv[2];

var third = process.argv[3];

var fourth = process.argv[4];
var keys = require('./keys.js');
var Twitter = require('twitter');
 //END OF GLOBAL VARIABLES


var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
 
var params = {screen_name: '@nosilla_marie'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets[0].text);
  }
});