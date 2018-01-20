
require("dotenv").config();

const keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");



var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var userAction = process.argv[2];

if (userAction === "my-tweets") {
    var params = {
        screen_name: 'fawadzafar713'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (t = 0; t<tweets.length; t++)
            console.log(tweets[t].text);
        }
    });
}


if (userAction === "spotify-this-song") {
    spotifyer();

}
    function spotifyer(song) {
    var songName = process.argv[3];

    for (i = 4; i < process.argv.length; i++) {
        songName = songName + "+" + process.argv[i];
    }

    spotify.search({
        type: 'track',
        query: songName,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("song's Name: " + data.tracks.items[0].name);
        console.log("Artist's Name: " + data.tracks.items[0].artists[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url)
        console.log("Album's Name: " + data.tracks.items[0].album.name)

    });
}


if (userAction === "movie-this") {
    var movieName = process.argv[3];


    for (i = 4; i < process.argv.length; i++) {
        movieName = movieName + "+" + process.argv[i];
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    var request = require("request");

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("The name of the movie: " + JSON.parse(body).Title);
            console.log("The year of the movie: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Production country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

}
//////////
if (userAction === "do-what-it-says"){

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        // console.log(data);

        // var songName = data.split('"').join('')
        // console.log(songName);

        // songName = process.argv[3];

        var dataArr = data.split(",");

        console.log(dataArr);

        // dataArr[0] = process.argv[]

       

    });
}
