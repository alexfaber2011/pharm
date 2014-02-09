var papi = require('./modules/papi');

exports.index = function(req, res){
	
	var query = req.params.query;
	var location = req.params.loc;
	var business_type = req.params.business_type;
	
	papi.doPrediction(query, location, business_type, function(result){
		json = JSON.parse(result);
	});
};
