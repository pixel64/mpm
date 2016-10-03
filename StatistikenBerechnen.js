
var jsonfile = file_get_contents('.../JsonBeispiel.json');
var jsonarray = json_decode(jsonfile);

function getStatistics(jsonarray)
{

	var rtn = {};
	for(var locations in jsonarray["Location"])
	{
		var xCoord = locations["Xcoordinate"];
		var yCoord = locations["Ycoordinate"];
		
		var val1 = {}
		var val2 = {}
		var val3 = {}
		var nettype = {}
		
		for (var networks in locations["Network"]){
			val1.push(networks["Value1"]);
			val2.push(networks["Value2"]);
			val3.push(networks["Value3"]);
			nettype.push(networks["Mobiletype"]);
		}
		
		var val1m = mittelwert(val1);
		var val2m = mittelwert(val2);
		var val3m = mittelwert(val3);
		
		rtn.push({xCoord,yCoord,val1m,val2m,val3m,nettype});
	}
	return rtn;
}

function mittelwert(var arr){
var sum = 0;
for( var i = 0; i < arr.length; i++ ){
    sum += parseInt( arr[i], 10 ); //don't forget to add the base
}

return sum/arr.length;	
}