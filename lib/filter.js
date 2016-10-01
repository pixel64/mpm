/**
 * filter.js
 * This file is ment to filter data.
 */

function filterNetwork(network){
    var filesArrayLength = objectLength(filesAsArray);
    for(var i = 0; i < filesArrayLength; i++){
        var locationsAsArray = filesAsArray[i];
        var locationsArrayLength = objectLength(locationsasArray);
        for(var j = 0; j < locationsArrayLength; j++){
            if(locationsAsArray[j]["entry"] === "network"){
                alert(locationsAsArray[j]["entry"])
            }
        }
    }
}