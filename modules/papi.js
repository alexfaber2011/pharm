// /papi/:query/:location/:target

var census = require('./census');
var yellow_pages = require('./yellow_pages');
var economic = require('./economic');
var google = require('./google_places');



exports.doPrediction = function(req, res) {
	console.log("in papi");

	var query = req.params.query;
	var location = req.params.location;
	var business_type = req.params.business_type;

	// app.get('/yellow/:what/:where', yellow_pages.getYellow);
	// app.get('/zillow', economic.get_zillow);
	// app.get('/census/:type/:keypat/:sumlevid', census.getData);

	// Find top 10 cities in state
	census.getData("pop", location, "4,6", function(result){
		// res.send(result);
		var cities = JSON.parse(result);
		// console.log(cities);
		
		city = cities["response"][0];
		// Find Google Listings
		google.getCityData(city["placename"], city["StatePostal"], business_type, query, function(result){
			var businesses = JSON.parse(result);
			
		})//google
	});//census.getData
	
}