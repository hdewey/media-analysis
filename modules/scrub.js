var fs = require('fs'); 
var parse = require('csv-parse');


// Function for writing data to a file
var writeToFile = function(text) {
	// writing to the file clean.txt
	var path = 'data/clean.txt'
	fs.appendFile(path, text + '\n', function (err) {
	  if (err) throw err;
	});
} 

exports.writeToFile = function(text, path) {
	fs.appendFile(path, text + '\n', function (err) {
	  if (err) throw err;
	});
} 

// Used for striping away excess metadata and characters.
var strip = function(textArray) {

	// Array for each tweet
	var text = textArray[0];

	// Splitting the text from the array, into smaller arrays
	var textSplit = text.split(' ');

	var cleanText = [];

	// Looping for each word
	var b = 0;
	while (b < textSplit.length) {
		if(!textSplit[b].includes('https://')) {
			cleanText.push(textSplit[b])
		}
		b++
	}
	cleanText = cleanText.toString();
	cleanText = cleanText.replace(/,/g, ' ');
	writeToFile(cleanText);
}

exports.run = function() {
	var csvData=[];
	var path = 'data/tweets.csv'
	fs.createReadStream(path)
	.pipe(
		parse( {
			delimiter: '`',
			relax: true
		}))
	.on('data', function(csvrow) {
	  csvData.push(csvrow);        
	})
	.on('end',function() {
		var i = 0;
		while (i < csvData.length) {
			strip(csvData[i]);
			i++;
		}
	});
}

