var keys = require('./keys.js');

var Twitter = require('twitter');

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



var pick = function (caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      getMyTweets();
      break;
    case 'my-spotify':
      spotifyThis();
      break;
    default:
      console.log('LIRI does not know that');
  }
}


var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);







