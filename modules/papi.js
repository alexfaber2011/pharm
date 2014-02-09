// /papi/:query/:location/:target

var census = require('./census');
var yellow_pages = require('./yellow_pages');
var economic = require('./economic');
var google = require('./google_places');
var twitter = require('./twitter')
var request = require('request');
var sort = require('./find5');



exports.doPrediction = function(query, location, business_type, cb) 
{
	console.log("in papi");
	var city_array = new Array();
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
				listings:{}, 
				score:{}
			}
			
			// console.log(city["Placename"]);
			
			request("http://api.sba.gov/geodata/all_links_for_city_of/" + city["Placename"] + "/" + location + ".json",
			
			 function(error, response, body) {
				if(error){console.log(res.send(error))}
				var lat = JSON.parse(body)[0]["primary_latitude"];
				var lon = JSON.parse(body)[0]["primary_longitude"];
				var number_of_businesses;
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
		
	// { city: 'San Jose',
	//     state: 'CA',
	//     tweets: 100,
	//     zillow_data:
	//      { City: 'San Jose',
	//        State: 'California',
	//        MeanValue: 654300,
	//        MedianHouseholdIncome: 70243,
	//        MedianSquareFoot: 401,
	//        latitude: 37.297016,
	//        longitude: -121.817409 },
	//     listings: 0 },	
		
	var timer = setInterval(function() {
		if (done == true) {
			city_array.forEach(function(parsed_city){
				economy = parsed_city["zillow_data"]["MeanValue"] + parsed_city["zillow_data"]["MedianSquareFoot"] + parsed_city["zillow_data"]["MedianHouseholdIncome"];
				score = (economy/100000) + (parsed_city["tweets"]/100);
				console.log(score);
				parsed_city.score = score;
				// console.log(parsed_city);
			});
			console.log(sort.getTop5(city_array));
			cb(sort.getTop5(city_array));
			clearInterval(timer);
		}
	}, 100);
}//exports




