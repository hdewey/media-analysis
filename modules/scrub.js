var fs = require('fs'); 
var parse = require('csv-parse');

var writeToFile = function(text) {
	fs.appendFile('data/clean.txt', text + '\n', function (err) {
	  if (err) throw err;
	});
} 

var strip = function(textArray) {
	var x = 0;
	while (x < textArray.length) {
		var text = textArray[0];

		var textSplit = text.split(' ');
		
		var cleanText = [];

		var b = 0;
		while (b < textSplit.length) {
			if(!textSplit[b].includes('https://')) {
				cleanText.push(textSplit[b])
			}
			b++
		}
		x++;
	}
	cleanText = cleanText.toString();
	cleanText = cleanText.replace(/,/g, ' ');
	writeToFile(cleanText);
}

exports.run = function() {
	var csvData=[];
	fs.createReadStream('data/tweets.csv')
	.pipe(parse({delimiter: '`',relax: true}))
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

