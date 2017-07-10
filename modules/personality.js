var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personality_insights = new PersonalityInsightsV3({
  username: 'bcbd9c1d-d2fc-4a40-b752-f40958fedf3b',
  password: 'MMD01pTNpXPH',
  version_date: '2016-10-20'
});

var fs = require('fs');

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
  personality_insights.profile(params, function(error, response) {
    if (error)
      console.log('Error:', error);
    else
      console.log(JSON.stringify(response, null, 2));
    }
  );
}