/**
 * filter.js
 * Hier wird das Filter handling durchgeführt
 */
var initFilesForFilter = function(){
    filterNetwork("all");
}
var filterNetwork = function(network){
    var filesArrayLength = objectLength(filesAsArray);
    sortedFilesArray = [];
    if(network === "all"){
        for(var i = 0; i < filesArrayLength; i++){
            var valuesArray = filesAsArray[i];
            var valuesArrayLength = objectLength(valuesArray);
            for (var j = 0; j < valuesArrayLength; j++) {
                sortedFilesArray.push(valuesArray[j]);
            }
        }
    }else {
        for (var i = 0; i < filesArrayLength; i++) {
            var valuesArray = filesAsArray[i];
            var valuesArrayLength = objectLength(valuesArray);
            for (var j = 0; j < valuesArrayLength; j++) {
                if (valuesArray[j]["network"] === network) {
                    sortedFilesArray.push(valuesArray[j]);
                }
            }
        }
    }
}

var filterBandwidth = function(bandwidth){
    var valuesArrayLength = objectLength(sortedFilesArray);
    var tmpSortedArray = [];
    for (var i = 0; i < valuesArrayLength; i++) {
        if (sortedFilesArray[i]["bandwidth"]["value"] >= bandwidth) {
            tmpSortedArray.push(sortedFilesArray[i]);
        }
    }
    sortedFilesArray = tmpSortedArray;
}

var filterSignal = function(signal){
    var valuesArrayLength = objectLength(sortedFilesArray);
    var tmpSortedArray = [];
    for (var i = 0; i < valuesArrayLength; i++) {
        if (sortedFilesArray[i]["signal"] >= signal) {
            tmpSortedArray.push(sortedFilesArray[i]);
        }
    }
    sortedFilesArray = tmpSortedArray;
}

var filterDaytime = function(from,to){
    var valuesArrayLength = objectLength(sortedFilesArray);
    var tmpSortedArray = [];
    for (var i = 0; i < valuesArrayLength; i++) {
        var date = new Date(sortedFilesArray[i]["startLocation"]["datetime_unix"] * 1000);
        var starttime = date.getHours();
        if(starttime >= from && starttime <= to) {
            tmpSortedArray.push(sortedFilesArray[i]);
        }
    }
    sortedFilesArray = tmpSortedArray;
}