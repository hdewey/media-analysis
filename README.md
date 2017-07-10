# Append Data to a CSV file

```
var fs = require('fs');
fs.appendFile('data/tweets.csv', ' Testing\n', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
```

# Stream Data from Twitter and Filter Tweets

```
var stream = function(data) {
	var stream = client.stream('statuses/filter', {track: '@POTUS', track: '@realDonaldTrump', track: "Trump's", track: 'Trump'});
	stream.on('data', function(tweet) {
		if (tweet.user !== undefined) {
			var username = tweet.user.screen_name.toLowerCase();
			var x  = 0;
			while (x < data.length) {
				//console.log(data[x][0])
				if (username == data[x][0].toLowerCase()) {
					console.log(tweet.text + ' (tweeted by ' + username + ')')
				}
				x++;
			}
		}
	});
}
```

# Read data from a CSV file
```

var csvData=[];
fs.createReadStream('data/accounts.csv')
.pipe(parse({delimiter: ':'}))
.on('data', function(csvrow) {
  csvData.push(csvrow);        
})
.on('end',function() {
	console.log('starting...')
	stream(csvData);
});
```