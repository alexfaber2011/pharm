var request = require('request');
var parseString = require('xml2js').parseString;


exports.get_zillow = function(req, res){

	console.log("in 'get_zillow'");
	request('http://www.zillow.com/webservice/GetDemographics.htm?zws-id=X1-ZWz1bac423yk23_7x5fi&state=WA&city=Seattle&neighborhood=Ballard', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	parseString(body, function (err, result) {
	  		res.json(result);
		});
	  }
	})
};

exports.shit = function(req, res){
	console.log("fuck");
}
