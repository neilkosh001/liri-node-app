var keys = require('./keys.js');

var Twitter = require('twitter');

var spotify = require('spotify');

var getMyTweets = function (){


 
var client = new Twitter(keys.twitterKeys);

 
var params = {screen_name: '_angrbrd'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {


for (var i=0; i<tweets.length; i++)  {
console.log (tweets[i].created_at);
console.log('');
console.log(tweets[i].text);
  
    }
  }
});



spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
  if ( err ) {
      console.log('Error occurred: ' + err);
      return;
  

console.log(data);
  }
});

var pick = function (caseData, functionData){
  switch(caseData) {
    case 'my-tweets':
    getMyTweets();
    break;
    default:
    console.log('LIRI does not know that');
    }
  }
}

var runThis = function(argOne, argTwo) {
  pick(argOne. argTwo);
}

runThis(process.argv[2].process.argv[3]);
      
  