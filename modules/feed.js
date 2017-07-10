var Twitter = require('twitter');
var fs = require('fs'); 
var parse = require('csv-parse');

require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var writeToFile = function(tweet, user) {
	fs.appendFile('./data/tweets.csv', '\n' + tweet + '`' + user, function (err) {
	  if (err) throw err;
	});
} 

var filter = function(tweet, data) {
	if (tweet.user !== undefined) {
		var username = tweet.user.screen_name.toLowerCase();
		var x  = 0;
		while (x < data.length) {
			if (username == data[x][0].toLowerCase()) {
				console.log(tweet.text + ' (tweeted by ' + username + ')')
				writeToFile(tweet.text, username);
			}
			x++;
		}
	}
}

var stream = function(data) {
	var stream = client.stream('statuses/filter', {track: '@POTUS', track: '@realDonaldTrump', track: "Trump's", track: 'Trump'});
	stream.on('data', function(tweet) {
		filter(tweet, data);
	});
}

exports.run = function() {
	var csvData=[];
	fs.createReadStream('./data/accounts.csv')
	.pipe(parse({delimiter: '`'}))
	.on('data', function(csvrow) {
	  csvData.push(csvrow);        
	})
	.on('end',function() {
		console.log('starting...')
		stream(csvData);
	});
}
