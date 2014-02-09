
exports.getTop20 = function(json){
	console.log("in Top20");
	var jsonArray = new Array();
	var topIndexes = new Array();
	var highest;

	for(var a=0; a < 20; a++){
		highest = 0;
		topIndex = -1;
		for(var i=0; i < Object.keys(json).length; i++){
			if(parseInt(json[i]["Pop"]) > highest && topIndexes.indexOf(i) == -1){
				highest = json[i]["Pop"];
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