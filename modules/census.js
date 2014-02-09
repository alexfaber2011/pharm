var request = require('request');

var USA_TODAY_KEY = "s2dakjn2ap9zbjgng5jwpacr";

exports.getData= function(typeArg, keypatArg, sumlevidArg, cb) {
var requestBaseURL = "http://api.usatoday.com/open/census/";	
var type = typeArg+"?"
var keypat = keypatArg+"&";
var sumlevid = sumlevidArg+"&";
var api = "api_key="+USA_TODAY_KEY;


function callback(error, response, body){
	if (!error && response.statusCode == 200) {
		cb(body); //success
	}else {
		console.log(error); //failed
	}
};

request(requestBaseURL+type+keypat+sumlevid+api, function (error, response, body) {}, callback);

};