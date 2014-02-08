var request = require('request');
var parseString = require('xml2js').parseString;

request('http://www.zillow.com/webservice/GetDemographics.htm?zws-id=X1-ZWz1bac423yk23_7x5fi&state=WA&city=Seattle&neighborhood=Ballard', function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	parseString(body, function (err, result) {
	    console.dir(JSON.stringify(result));
	});
  }
})
