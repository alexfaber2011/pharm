// Geocoding API
// Example request - http://api.sba.gov/geodata/all_links_for_city_of/boston/ma.json

// Google API
// Base format - https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters 
// Example request - https://maps.googleapis.com/maps/api/place/textsearch/json?query=barber&location=32.71,-117.15&radius=20&sensor=false&key=AIzaSyATJzyl_9H5NGT1hOFkP5k7ZZSB9JSCiDw
// Parameters - 
//			query: text string to search
//			key: api key
//			location: latitide,longitude
//			radius: x
//			minprice/maxprice: 0-4

var request = require("request");

exports.getCityData = function(city, state, business_type, query, cb) {
	
	function getGoogle(error, response, body, lat, lon) {
		request({
			uri: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query + "&location=" + lat + "," + lon + "&type=" + business_type + "&rankby=prominence&radius=20&sensor=false&key=AIzaSyATJzyl_9H5NGT1hOFkP5k7ZZSB9JSCiDw",
			method: "GET", 
			JSON: true
		}, function(error, response, body) {
			cb(body);
	 	}); // request 
	}; // getGoogle
	
	request({
		uri: "http://api.sba.gov/geodata/all_links_for_city_of/" + city + "/" + state + ".json",
		method: "GET",
		json: true
	}, function(error, response, body) {
		lat = body[0]["primary_latitude"];
		lon = body[0]["primary_longitude"];
	}, getGoogle ); //request
	
}; //function
