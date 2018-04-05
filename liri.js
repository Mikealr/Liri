require("dotenv").config();
// Node module imports needed to run the functions
var fs = require("fs"); //reads and writes files
var request = require("request");
var keys = require("./keys.js");
var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var liriArgument = process.argv[2];
// ---------------------------------------------------------------------------------------------------------------
// Possible commands for this liri app
switch (liriArgument) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
        // Instructions displayed in terminal to the user
    default:
        console.log("\r\n" + "Try typing one of the following commands after 'node liri.js' : " + "\r\n" +
            "1. my-tweets 'any twitter name' " + "\r\n" +
            "2. spotify-this-song 'any song name' " + "\r\n" +
            "3. movie-this 'any movie name' " + "\r\n" +
            "4. do-what-it-says." + "\r\n" +
            "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};
// ---------------------------------------------------------------------------------------------------------------
// Functions
// Movie function, uses the Request module to call the OMDB api
function movieThis() {
    var movie = process.argv[3];
    if (!movie) {
        movie = "mr nobody";
    }
    params = movie
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            //console.log(movieObject); // Show the text in the terminal
            var movieResults =
                "------------------------------ begin ------------------------------" + "\r\n"
            "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language: " + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
                "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" +
                "------------------------------ fin ------------------------------" + "\r\n";
            console.log(movieResults);
            log(movieResults); // calling log function
        } else {
            console.log("Error :" + error);
            return;
        }
    });
};
