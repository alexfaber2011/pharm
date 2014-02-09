var census = require('./census');
var yellow_pages = require('./yellow_pages');
var economic = require('./economic');

exports.doPrediction = function(req, res) {

	var query = req.params.query;
	var location = req.params.location;
	var target = req.params.target;

	// app.get('/yellow/:what/:where', yellow_pages.getYellow);
	// app.get('/zillow', economic.get_zillow);
	// app.get('/census/:type/:keypat/:sumlevid', census.getData);

	// Find top 10 cities in state
	census.getData("pop", "CA", "4,6", function(result){
		res.send(result);
	});
	
}