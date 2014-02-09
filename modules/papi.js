// /papi/:query/:location/:target

var census = require('./census');
var yellow_pages = require('./yellow_pages');
var economic = require('./economic');
var google = require('./google_places');



exports.doPrediction = function(query, location, business_type, cb) 
{
	console.log("in papi");

	// Find top 10 cities in state
	census.getData("pop", location, "4,6", function(result)
	{
		var cities = result;

		city = cities[0];
		
		//Easiest way to get all business listings
		// Begin shittiest code ever
		google.getCityData(city["placename"], city["StatePostal"], business_type, query, "", function(result)
		{
			var businesses = JSON.parse(result);
			var number_of_businesses = 0;
			if (businesses["next_page_token"])
			{
				number_of_businesses = 20;
				google.getCityData(city["placename"], city["StatePostal"], business_type, query, businesses["next_page_token"], function(result)
				{
					businesses = JSON.parse(result);
					if (businesses["next_page_token"])
					{
						number_of_businesses = 40;
						google.getCityData(city["placename"], city["StatePostal"], business_type, query, businesses["next_page_token"], function(result)
						{
							businesses = JSON.parse(result);
							number_of_businesses = 40 + businesses["results"].length;
							console.log(number_of_businesses);
						});
					}
					else
					{
						number_of_businesses = 20 + businesses["results"].length;
					}
				});
			}
			else
			{
				number_of_busineses = businesses["results"].length;
			}
		});//google
		// End shittiest code ever
		
		// Zillow
		
				
	});//census.getData
}//exports