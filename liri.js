var keys = require('./keys.js');

var Twitter = require('twitter');

var request = require('request');

var fs = require("fs");


var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotifyKeys);

var getMyTweets = function () {


  var client = new Twitter(keys.twitterKeys);


  var params = { screen_name: '_angrbrd' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {


      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);

      }
    }
  });

}

var spotifyThis = function () {

  spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    
    };

    console.log(data.tracks.items[0]);

    for (var x = 0; x < 20; x++) {
      console.log("Songs Information #" + (x + 1),
        "\nName: " + data.tracks.items[x].name,
        "\nArtist: " + data.tracks.items[x].artists[0].name,
        "\nAlbum: " + data.tracks.items[x].album.name,
        "\nPreview URL: " + data.tracks.items[x].preview_url + "\n");
    }
  });


};



var getMeMovie = function(movieName) {
  
request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy",
function(error, response, body) {
    if (!error && response.statusCode === 200) {

      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
    }
  });
};

var doWhatItSays = function () {

fs.readFile ('random.txt', 'utf8' , function (err,data) {
  if (err) throw err;

  var dataArr = data.split(',');

   if (dataArr.length == 2) {
     pick(dataArr[0], dataArr[1]);
   } else if (dataArr.length ==1) {
     pick(dataArr[0]);
   }
   
});
}

var pick = function (caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      getMyTweets();
      break;
    case 'my-spotify':
      spotifyThis();
      break;
    case 'movie-this':
      getMeMovie();
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('LIRI does not know that');
  }
}


var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);







