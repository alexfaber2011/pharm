exports.getTop5 = function(json){
	console.log("in Top5");
	var jsonArray = new Array();
	var topIndexes = new Array();
	var highest;

	for(var a=0; a < 5; a++){
		highest = 0;
		topIndex = -1;
		for(var i=0; i < Object.keys(json).length; i++){
			if(parseFloat(json[i]["score"]) > highest && topIndexes.indexOf(i) == -1){
				highest = json[i]["score"];
				topIndex = i;
			}
		}
		if(topIndex != -1){
			topIndexes.push(topIndex);
		}
	}

	for(b=0; b < topIndexes.length; b++){
		jsonArray[b] = json[topIndexes[b]];
	}

	// console.log(jsonArray);
	return(jsonArray);
}