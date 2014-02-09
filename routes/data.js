var papi = require('../modules/papi');

exports.index = function(req, res){
	
	var query = req.params.query;
	var location = req.params.loc;
	var business_type = req.params.business_type;
	
	papi.doPrediction(query, location, business_type, function(result){
		json = JSON.parse(result);
	});

	//topCities = ["Milwaukee" => "10", "Madison" => "9", "Green Bay" => "8", "Wausau" => "7", "Kenosha" => "6"];


	res.render('data', { title: 'BisNiche', topCities:[] });
};
