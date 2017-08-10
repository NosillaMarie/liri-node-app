var second = process.argv[2];
var third = process.argv[3];
var fourth = process.argv[4];
var keys = require('./keys.js');
var Twitter = require('twitter');
//END OF GLOBAL VARIABLES
//TWITTER NPM
var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key
    , consumer_secret: keys.twitterKeys.consumer_secret
    , access_token_key: keys.twitterKeys.access_token_key
    , access_token_secret: keys.twitterKeys.access_token_secret
});
var params = {
    screen_name: '@nosilla_marie'
};
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(tweets[0].text);
    }
});
//SPOTIFY NPM
function spotify(song) {
    var spotify = require('spotify');
    if (third) {
        spotify.search({
                type: 'track'
                , query: 'song'
            }, function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                } else {
                    console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
                    console.log("Album: ")
                }
            }
        });
}