//KEYS
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');
//GLOBAL VARIABLES
var second = process.argv[2];
var third = process.argv[3];
//END OF GLOBAL VARIABLES

//TWITTER NPM
function twitterTweets() {
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key
        , consumer_secret: keys.twitterKeys.consumer_secret
        , access_token_key: keys.twitterKeys.access_token_key
        , access_token_secret: keys.twitterKeys.access_token_secret
    });
    var params = {
        screen_name: '@thinkgeek'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
        }
        else if (!error  && response.statusCode == 200) {
            for (var i = 19; i >= 0; i--) {
                console.log("TWEETS " + (i + 1) + ": " + tweets[i].text);
            }
            //            console.log(tweets[0].text);
        }
    });
    return;
}
if (second === "my-tweets") {
    twitterTweets();
}
//SPOTIFY NPM
function spotifyMusic(song) {
        var spotify = new Spotify({
            id: '7ceaff1dc7254746bbcdda036c96e3b1',
            secret: '27185375e8f04931b988fc2b9180222a'
        });
    spotify.search({
        type: 'track'
        , query: third
        , limit: '1'
    }, function (err, data) {
        if (err) {
            return console.log('Error Occurred: ' + err);
        }
        else if (!err) {
            console.log("\nArtist: " + data.tracks.items[0].album.artists[0].name + "\n ");
            console.log("Song Title: " + data.tracks.items[0].name + "\n ");
            console.log("Album: " + data.tracks.items[0].album.name + "\n ");
            console.log("Song Preview URL: " + data.tracks.items[0].album.external_urls.spotify);
        }
//        console.log(data);
    });
}
if (second === "spotify-this-song") {
    spotifyMusic();
}
var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&t=" + third + "&y=&plot=short&r=json";
request(queryURL, function (error, response, body) {
    if (!error && response.statusCode == 200 && second === "movie-this") {
        body = JSON.parse(body);
        console.log("\nMovie Title: " + body.Title + "\n ");
        console.log("Year Released: " + body.Released + "\n ");
        console.log("Rating: " + body.Rated + "\n ");
        console.log("Production Country: " + body.Country + "\n ");
        console.log("Language: " + body.Language + "\n ");
        console.log("Plot: " + body.Plot + "\n ");
        console.log("Actors: " + body.Actors + "\n ");
        console.log("Rotten Tomatoes Rating: " + body.tomatoUserRating + "\n ");
        console.log("Rotten Tomatoes URL: " + body.tomatoURL);
        return;
    }
    else {
        console.log("Error: " + error);
        return;
    }
});
//execute the random.txt file
function toDo() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log("Um...that didn't work...");
        }
        else {
            console.log(data);
        }
    });
}
if (second === "do-what-it-says") {
    toDo();
}
