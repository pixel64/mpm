/**
 * Funktion, die die eingebene datei einliest und via postMessage zurück wirft
 */
getFile = function(file){
    var jsons = "";
    var loading = false;
    var retArray = {};
    var deep = -1;
    var network = 0;
    var text = "";
    var lines;
    if(file.type.match('text.*')){
        var reader = new FileReader();
        reader.onload = function(e){
            lines = this.result.split('\n');
            var test = lines[0].split(";");
            if(test[0] === "version") {
                var parsedArray = parseArray(lines);
                var stringObj = JSON.stringify(parsedArray);
                postMessage(stringObj);
            }else{
                postMessage({error:"Die Datei ist ungültig."})
            }
        }
        reader.readAsText(file);

    }else{
        postMessage({error:"Die Datei ist ungültig."});
    }
}

onmessage = function(event){
    var files = event.data.files;
    for (var i = 0; i < files.length; i++) {
        loading = true;
        getFile(files[i]);

    }
}

/**
 * @param arr zeilenweise eingelesene datei
 * @return retArray git ein Objekt Array mit Informationen zurück
 * Funktion, die die eingelesenen Daten sortiert und als Objekt Array zurück gibt
 */
var parseArray = function(arr){
    var iteration  = 0;
    var index = 0;
    var networks = 0;
    var tmpNetworks = {};
    var retArray = {};
    var tmpArray = {};
    var tmpSignal = 0;
    for(var i = 0; i < arr.length; i++){
        var line = arr[i].split(";");
        if(line[0] === "location"){
            var loc = "";
            if(iteration === 0){
                loc = "startLocation";
                iteration = 1;
                tmpArray["signal"] = 0;
            }else{
                loc = "endLocation";
                iteration = 0;
            }
            tmpArray[loc] = {};
            tmpArray[loc]["x"] = line[1];
            tmpArray[loc]["y"] = line[2];
            tmpArray[loc]["accuracy"] = line[3];
            tmpArray[loc]["datetime_unix"] = line[4];
            tmpArray[loc]["datetime_human"] = line[5];
        }else if(line[0] === "networks"){
            tmpNetworks[networks] = {};
            tmpNetworks[networks]["type"] = line[1];
            tmpNetworks[networks]["subtype"] = line[2];
            tmpNetworks[networks]["bandwidth"] = line[3];
            tmpNetworks[networks]["signalStrength"] = line[4];
            tmpNetworks[networks]["errorRate"] = line[5];
            tmpNetworks[networks]["datetime_unix"] = line[6];
            tmpNetworks[networks]["datetime_unix"] = line[7];
            tmpArray["signal"] += Math.floor(tmpNetworks[networks]["signalStrength"]);
            tmpArray["network"] = tmpNetworks[networks]["subtype"];
            networks++;
        }else if(line[0] === "bandwidth"){
            tmpArray["networks"] = tmpNetworks;
            tmpArray["signal"] = tmpArray["signal"]/networks;
            networks = 0;
            tmpArray["bandwidth"] = {};
            tmpArray["bandwidth"]["datetimeStart_unix"] = line[1];
            tmpArray["bandwidth"]["datetimeStart_human"] = line[2];
            tmpArray["bandwidth"]["file_size"] = line[3];
            tmpArray["bandwidth"]["file_size_extrapolated"] = line[4];
            tmpArray["bandwidth"]["datetimeEnd_unix"] = line[5];
            tmpArray["bandwidth"]["datetimeEnd_human"] = line[6];
            tmpArray["bandwidth"]["value"] = calcBandwidth(tmpArray["bandwidth"]["file_size_extrapolated"]);
        }else if(line[0] === "battery"){
            tmpArray["battery"] = {};
            tmpArray["battery"]["mAh"] = line[1];
            tmpArray["battery"]["mWh"] = line[2];
            tmpArray["battery"]["datetime_unix"];
            tmpArray["battery"]["datetime_human"];
            retArray[index] = tmpArray;
            tmpArray = {};
            index++;
        }
    }
    return retArray;
}
/**
 * @param size
 * @return bandwith
 * Funktion, die die Bandbreite über die File größe ermittelt (in kBps)
 */
var calcBandwidth = function(size){
    return size/10;
}
