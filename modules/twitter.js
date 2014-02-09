var util = require('util');
var OAuth = require('oauth').OAuth;

var access_token = '948781885-OxRRMNA43TMd7HB2Grr8HzTPghSt56ksqM5yrUF6';
var access_token_secret = 'F1Hxx50evQZlN00dHROTuHvOsUTMIPpox1ORHfWPoCBX4'

exports.search = function(query, lat, lng, distance, cb){
	var oa = new OAuth("https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "7JM2aWzCwhvokiIGqDkECg",
    "vWiJnJwSFn33rgHDO2cAOd2V1Un77POdwrpiWOcDJA",
    "1.0A",
    null,
    "HMAC-SHA1");

    callURL = util.format('https://api.twitter.com/1.1/search/tweets.json?q=%s%20%20&geocode=%s%2C%s%2C%s', query, lat, lng, distance);

    oa.get(callURL, access_token, access_token_secret, function (error, data) {
        var result;
        if(error){
            result = {error: error};
            cb(result);
        }else{
            result = data;
            cb(result);
        }
    });
}
