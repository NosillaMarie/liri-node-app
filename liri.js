//keys
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');
//global variables to use
var second = process.argv[2];
var third = process.argv.slice(3).join('+');
//end of global variables
//twitter npm gives you the most recent 20 tweets associated 
function twitterTweets() {
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key
        , consumer_secret: keys.twitterKeys.consumer_secret
        , access_token_key: keys.twitterKeys.access_token_key
        , access_token_secret: keys.twitterKeys.access_token_secret
    });
    var params = {
        screen_name: '@nosilla_marie',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
        }
        //if there is no error and the status code is 200 loop through the most recent 20 tweets of the user provided.
        else if (!error && response.statusCode == 200) {
            for (var i = tweets.length - 1; i > -1; i--) {
                console.log(tweets[i].created_at + " " + "TWEET # " + (i + 1) + ": " + tweets[i].text);
                
                
            }
            //            console.log(tweets[0].text);
        }
    });
    return;
}
if (second === "my-tweets") {
    twitterTweets();
}
//spotify NPM takes in inputs of song names and outputs various information about the song including artist and album.
function spotifyMusic(song) {
    var spotify = new Spotify({
        id: '7ceaff1dc7254746bbcdda036c96e3b1'
        , secret: '27185375e8f04931b988fc2b9180222a'
    });
    if (third === undefined) {
        third = 'The Sign Ace of Base';
    }
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

function movie() {
    //if there is no argv[3] assign argv[3] to "Mr. Nobody".
    if (third === undefined) {
        third = "Mr. Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&t=" + third + "&y=&plot=short&r=json";
    console.log(queryURL);
    request(queryURL, function (error, response, rbody) {
        if (!error && response.statusCode == 200 && second === "movie-this") {
            body = JSON.parse(rbody);
            console.log("\nMovie Title: " + body.Title + "\n ");
            console.log("Year Released: " + body.Released + "\n ");
            console.log("IMDB Rating: " + body.Rated + "\n ");
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value + "\n ");
            console.log("Production Country: " + body.Country + "\n ");
            console.log("Language: " + body.Language + "\n ");
            console.log("Plot: " + body.Plot + "\n ");
            console.log("Actors: " + body.Actors + "\n ");
            return;
        }
        else {
            console.log("Error: " + error);
            return;
        }
    });
}
//execute the random.txt file
function toDo() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("Um...that didn't work...something went wrong");
        }
        //take the text from random.txt and depending on what is written in the first string before the "," the code will perform one of the listed functions
        else {
            //            console.log(data);
            var text = data.trim().split(",");
            second = text[0];
            third = text[1];
            switch (second) {
            case "my-tweets":
                twitterTweets();
                break;
            case "spotify-this-song":
                spotifyMusic();
                break;
            case "movie-this":
                movie();
                break;
            }
        }
    });
}
if (second === "do-what-it-says") {
    toDo();
}