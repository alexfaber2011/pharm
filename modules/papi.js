// /papi/:query/:location/:target

var census = require('./census');
var yellow_pages = require('./yellow_pages');
var economic = require('./economic');
var google = require('./google_places');
var twitter = require('./twitter')
var request = require('request');



// exports.doPrediction = function(query, location, business_type, cb) 
exports.doPrediction = function(req, res)
{
	console.log("in papi");
<<<<<<< HEAD
	
	var query = req.params.query;
	var location = req.params.location;
	var business_type  = req.params.business_type;
	var city_array = new Array();
	
=======
	var city_array = new Array();
>>>>>>> 20e7bc94309d260d8489a0dd060555c23914188d
	var done = false;

	// Find top 10 cities in state
	census.getData("pop", location, "4,6", function(result) {	
		censusDone = true;
		console.log("begin papi");
		var cities = result,
			cityLength = cities.length;
		
		cities.forEach(function(city){
			
			var city_json = {
				city:{},
				state:{},
				tweets:{}, 
				zillow_data:{}, 
				listings:{}
			}
			
			// console.log(city["Placename"]);
			
			request("http://api.sba.gov/geodata/all_links_for_city_of/" + city["Placename"] + "/" + location + ".json",
			
			 function(error, response, body) {
				if(error){console.log(res.send(error))}
				var lat = JSON.parse(body)[0]["primary_latitude"];
				var lon = JSON.parse(body)[0]["primary_longitude"];
				var number_of_businesses = 0;
				city_json.city = city["Placename"];
				city_json.state = location;
					
				//Easiest way to get all business listings
				// Begin shittiest code ever
				google.getCityData(city["placename"], city["StatePostal"], business_type, query, "", function(result)
				{
					var businesses = JSON.parse(result);
					if (businesses["next_page_token"])
					{
						google.getCityData(city["placename"], city["StatePostal"], business_type, query, businesses["next_page_token"], function(result)
						{
							businesses = JSON.parse(result);
							if (businesses["next_page_token"])
							{
								google.getCityData(city["placename"], city["StatePostal"], business_type, query, businesses["next_page_token"], function(result)
								{
									businesses = JSON.parse(result);
									number_of_businesses = 40 + businesses["results"].length;
									doTwitterStuff();
								});
							}
							else
							{
								number_of_businesses = 20 + businesses["results"].length;
								doTwitterStuff();
							}
						});
					}
					else
					{
						number_of_busineses = businesses["results"].length;
						doTwitterStuff();
					}
				});//google
				// End shittiest code ever	
						
				// Twitter
				function doTwitterStuff() {
					twitter.search(query, lat, lon, "40mi", function(result){
						var tweets = JSON.parse(result);
						var number_of_tweets = Object.keys(tweets["statuses"]).length;
						city_json.tweets = number_of_tweets;
						
						// Zillow
						economic.get_zillow(location, city["Placename"], function(result){
							var econ_data = result;
							city_json.zillow_data = econ_data;
							city_json.tweets = number_of_tweets;
							city_json.listings = number_of_businesses;
							
							city_array.push(city_json);
							if (city_array.length == 20){
								done = true;
							}
						});//zillow
						
					});
				}
				
					
				// cb("foo");	
			});//lat_long_request
		});//cities.forEach
	});//census.getData
		
	var timer = setInterval(function() {
		if (done == true) {
			console.log(city_array);
			cb(city_array);
			clearInterval(timer);
		}
	}, 100);
}//exports