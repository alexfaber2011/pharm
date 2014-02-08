var request = require('request');
var parseString = require('xml2js').parseString;


exports.get_zillow = function(req, res){
	request('http://www.zillow.com/webservice/GetDemographics.htm?zws-id=X1-ZWz1bac423yk23_7x5fi&state=WI&city=Madison', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	parseString(body, function (err, result) {
	  		json = JSON.stringify(result);
	  		console.log(json["response"]);
	  		res.json(result);
		});
	  }
	})
};