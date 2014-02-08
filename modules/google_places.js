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


exports.getCityData = function(req, res) {
	
	request({
		uri: "http://api.sba.gov/geodata/all_links_for_city_of/" + req.params.city + "/" + req.params.state + ".json",
		method: "GET",
		json: true
	}, function(error, response, body) {
		// res.send(body);
		var lat = body[0]["primary_latitude"];
		var lon = body[0]["primary_longitude"];
		console.log(body);
		console.log("lat: " + lat);
		console.log("lat: " + lon);
		// res.send(lat + lon);
		
		request({
			uri: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + req.params.query + "&location=" + lat + "," + lon + "&type=" + req.param.business_type + "&radius=20&sensor=false&key=AIzaSyATJzyl_9H5NGT1hOFkP5k7ZZSB9JSCiDw",
			method: "GET", 
			JSON: true
		}, function(error, response, body) {
			res.send(body);
		}); //request 
	}); //request
}; //function
