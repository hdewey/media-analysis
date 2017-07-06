var Twitter = require('twitter');

require('dotenv').config()

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var fs = require('fs'); 
var parse = require('csv-parse');

var csvData=[];
fs.createReadStream('data/accounts.csv')
.pipe(parse({delimiter: ':'}))
.on('data', function(csvrow) {
  csvData.push(csvrow);        
})
.on('end',function() {
	// Array of usernames has been created.
});

var stream = client.stream('statuses/filter', {track: 'Trump'});
stream.on('data', function(tweet) {

	//console.log(tweet.user.screen_name)

	if (!tweet.user == undefined) {

		var username = tweet.user.screen_name;

		var x  = 0;
		while (x < csvData.length) {
			if (username == csvData[x]) {
				console.log(tweet.text + '( tweeted by ' + username + ' )')
			}
			x++;
		}
	}
});