var request = require('request');

var USA_TODAY_KEY = "s2dakjn2ap9zbjgng5jwpacr";

exports.getData= function(req, res) {
var requestBaseURL = "http://api.usatoday.com/open/census/";	
var type = req.params.type+"?"
var keypat = req.params.keypat+"&";
var sumlevid = req.params.sumlevid+"&";
var api = "api_key="+USA_TODAY_KEY;

request(requestBaseURL+type+keypat+sumlevid+api, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		res.send(body); //success
	}else {
		console.log(error); //failed
	}
})

};