var papi = require('../modules/papi');

exports.index = function(req, res){
	
	var query = req.body.query;
	var location = req.body.loc;
	var business_type = req.body.business_type;
	
	papi.doPrediction(query, location, business_type, function(result){
		res.send(result);
	});

	//topCities = ["Milwaukee" => "10", "Madison" => "9", "Green Bay" => "8", "Wausau" => "7", "Kenosha" => "6"];


	res.render('data', { title: 'BisNiche', topCities:[] });
};
