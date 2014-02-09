var request = require('request'),
	util = require('util');

var USA_TODAY_KEY = "s2dakjn2ap9zbjgng5jwpacr";

exports.getData= function(typeArg, keypatArg, sumlevidArg, cb) {
var requestBaseURL = "http://api.usatoday.com/open/census/";	
var type = typeArg+"?";
var keypat = "keypat="+keypatArg+"&";
var sumlevid = "sumlevid="+sumlevidArg+"&";
var api = "api_key="+USA_TODAY_KEY;

function callback(error, response, body){
	if (!error && response.statusCode == 200) {
		console.log('success'+body);
		cb(body); //success
	}else {
		console.log('error'+error); //failed
		cb(error);
	}
};

request(util.format('http://api.usatoday.com/open/census/%s?keypat=%s&sumlevid=%s&api_key=%s', typeArg, keypatArg, sumlevidArg, USA_TODAY_KEY), callback);

};