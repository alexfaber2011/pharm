// Sandbox API key - wxg2txv25janp6s9bufwfjyb
// What/Where API Key - 8d4m7z3yp3r74n75t26p3u5r
// Endpoint - http://api.sandbox.yellowapi.com

// FindBusiness - 
//	/FindBusiness/?pg={page}&what={what}&where={where}&pgLen={page length}&lang={en|fr}&fmt={json|xml}&sflag={search flags}&apikey={xxxxxxxxxxxxxxxxxxxxxxxx}&UID={unique identifier}

// GetBusinessDetails - 
// /GetBusinessDetails/?prov={province name}&city={city name}&bus-name={Business Name}&listingId={listing id}&lang={en|fr}&fmt={json|xml}&apikey={xxxxxxxxxxxxxxxxxxxxxxxx}&UID={unique_identifier}

// Example CURL - 
// curl http://api.sandbox.yellowapi.com/FindBusiness/?what=barbers&where=boston&pgLen=1000&fmt=JSON&UID=127.0.0.1&apikey=wxg2txv25janp6s9bufwfjyb

// *****HOW TO USE THIS MODULE******
// ROUTE: /yellow_pages/location/:location/type/:type
// STIPULATIONS: can only include one type parameter


var request = require("request");


exports.getYellow = function(what, where) {
	request({
		uri: "http://api.sandbox.yellowapi.com/FindBusiness/?what=" + what + "&where=" + where+ "&pgLen=1000&fmt=json&apikey=wxg2txv25janp6s9bufwfjyb&UID=127.0.0.1", 
		method: 'GET',
		json: true
	},function(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send(body);
		}else {
			console.log(error); //failed
		};
	})
};



