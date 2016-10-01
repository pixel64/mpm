

var jsonfile = file_get_contents('.../JsonBeispiel.json');
var jsonarray = json_decode(jsonfile);

function getStatistics(var jsonarray)
{
	var rtn = {};
	foreach(var locations in jsonarray["Location"])
	{
		x = locations["Xcoordinate"];
		y = locations["Ycoordinate"];
		
		val1 = {}
		val2 = {}
		val3 = {}
		nettype = {}
		
		foreach (var networks in locations["Network"]){
			val1.push(networks["Value1"]);
			val2.push(networks["Value2"]);
			val3.push(networks["Value3"]);
			nettype.push(networks["Mobiletype"]);
		}
		
		val1m = mittelwert(val1);
		val2m = mittelwert(val2);
		val3m = mittelwert(val3);
		
		rtn.push({x,y,val1m,val2m,val3m,nettype});
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