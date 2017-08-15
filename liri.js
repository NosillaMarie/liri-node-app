//KEYS
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');



//GLOBAL VARIABLES
var second = process.argv[2];
var third = process.argv[3];
var fourth = process.argv[4];
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
function twitterTweets() {

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
        } else {
            console.log(error);
        }
    });
    return;
}

if (command === "my-tweets") {
    myTweets();
}

//SPOTIFY NPM
function spotifyMusic(song) {

    //    var spotify = new Spotify({
    //        id: '7ceaff1dc7254746bbcdda036c96e3b1',
    //        secret: '27185375e8f04931b988fc2b9180222a'
    //    });

    spotify.search({
        type: 'track',
        query: 'value',
        limit: '1'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else if (!err) {
            console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].name, null, 2) + "\n ");
            console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n ");
            console.log("Album: " + JSON.strinigfy(data.tracks.items[0].album.name) + "\n ");
            console.log("Link: " + JSON.stringify(data.tracks.items[0].album.external_urls));
        }

        console.log(data);
    });
}

if (command === "spotify-song") {
    mySpotify();
}

var queryURL = 




