require('dotenv').config();
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var fs = require('fs');
var writeToFile = require('./scrub.js').writeToFile;

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var words = require("../data/clean.txt");

var params = {
  text: words,
  headers: {
    'accept-language': 'en',
    'accept': 'application/json'
  }
};

exports.run = function() {
  require('dotenv').config();

  var personality_insights = new PersonalityInsightsV3({
    //use_unauthenticated: true,
    username: process.env.WATSON_PERSONALITY_USERNAME,
    password: process.env.WATSON_PERSONALITY_PASSWORD,
    version_date: '2016-10-20'
  });

  personality_insights.profile(params, function(error, response) {
    if (error)
      console.log('Error:', error);
    else
      var x = 0;
      while(x < response.personality.length) {
        writeToFile(response.personality[x].name + ' = ' + response.personality[x].percentile, './data/results.txt')
        x++;
      }
      // writeToFile(JSON.stringify(response.personality, null, 2), './data/results.txt')
      //console.log(response.personality.length)

    }
  );
}