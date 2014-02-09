var request = require('request');
var parseString = require('xml2js').parseString;

exports.get_zillow = function(state, city, cb){
	function callback(error, response, body){

		if (!error) {
	        parseString(body, function (err, result) {
		  		jsonObject = JSON.parse(JSON.stringify(result));
		  		console.log(jsonObject);
		  		
		  		meanValue = parseInt(jsonObject["Demographics:demographics"]["response"][0]["pages"][0]["page"][0]["tables"][0]["table"][0]["data"][0]["attribute"][0]["values"][0]["city"][0]["value"][0]["_"]);
		  		percentDecreasing = parseFloat(jsonObject["Demographics:demographics"]["response"][0]["pages"][0]["page"][0]["tables"][0]["table"][0]["data"][0]["attribute"][6]["values"][0]["city"][0]["value"][0]["_"]);
		  		medianValueSqFoot = parseFloat(jsonObject["Demographics:demographics"]["response"][0]["pages"][0]["page"][0]["tables"][0]["table"][0]["data"][0]["attribute"][15]["values"][0]["city"][0]["value"][0]["_"]);
		  		medianHouseholdIncome = parseInt(jsonObject["Demographics:demographics"]["response"][0]["pages"][0]["page"][2]['tables'][0]["table"][0]["data"][0]["attribute"][0]["values"][0]["city"][0]["value"][0]["_"]);
		  		cityName = jsonObject["Demographics:demographics"]["response"][0]["region"][0]["city"][0];
		  		stateName = jsonObject["Demographics:demographics"]["response"][0]["region"][0]["state"][0];
		  		latitude = parseFloat(jsonObject["Demographics:demographics"]["response"][0]["region"][0]["latitude"][0]);
		  		longitude = parseFloat(jsonObject["Demographics:demographics"]["response"][0]["region"][0]["longitude"][0]);
		  		
				sendBack = {"City": cityName, "State": stateName, "MeanValue": meanValue, "MedianHouseholdIncome": medianHouseholdIncome, "MedianSquareFoot": medianValueSqFoot, "latitude": latitude, "longitude": longitude};
				cb(sendBack);
			});
	    }
	};
	// console.log("hello im in get zillow");
	// console.log('http://www.zillow.com/webservice/GetDemographics.htm?zws-id=X1-ZWz1bac423yk23_7x5fi&state='+state+'&city='+city);
	request('http://www.zillow.com/webservice/GetDemographics.htm?zws-id=X1-ZWz1dq70kp1157_8clop&state='+state+'&city='+city, function (error, response, body) {
		//
	}, callback)
};