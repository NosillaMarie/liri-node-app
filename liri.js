var second = process.argv[2];
var third = process.argv[3];
var fourth = process.argv[4];
var keys = require('./keys.js');
var Twitter = require('twitter');
//END OF GLOBAL VARIABLES

//switch (second) {
//    case 'my-tweets':
//    twitterTweets();
//    break;
//
//    case 'my-music':
//    spotifyMusic();
//    break;
//}

//TWITTER NPM
//function twitterTweets() {

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    var params = {
        screen_name: '@thinkgeek'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 19; i >= 0; i--) {
                console.log("TWEETS " + (i + 1) + ": " + tweets[i].text);
            }
//            console.log(tweets[0].text);
        }
    });
//}
//SPOTIFY NPM
function spotify(song) {
    var spotify = require('spotify');
    if (third) {
        spotify.search({
            type: 'track',
            query: 'song'
        }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
                console.log("Album: ")
            }
        });
    }
}
