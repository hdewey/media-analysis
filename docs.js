// Adding Data to a CSV
var fs = require('fs');

fs.appendFile('data/tweets.csv', ' Testing\n', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
// Done

