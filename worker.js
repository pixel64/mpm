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
            var parsedArray = parseArray(lines);
            var stringObj = JSON.stringify(parsedArray);
            postMessage(stringObj);
        }
        reader.readAsText(file);

    }else{
        jsons = "File not a text file";
    }
}

onmessage = function(event){
    var files = event.data.files;
    for (var i = 0; i < files.length; i++) {
        loading = true;
        getFile(files[i]);

    }
}

var parseLine = function(line){
    var ret = "";
    var res = line.split(";");
    if(res[0] === "version"){

    }
}

var parseArray = function(arr){
    var iteration  = 0;
    var index = 0;
    var networks = 0;
    var tmpNetworks = {};
    var retArray = {};
    var tmpArray = {};
    for(var i = 0; i < arr.length; i++){
        var line = arr[i].split(";");
        if(line[0] === "location"){
            var loc = "";
            if(iteration === 0){
                loc = "startLocation";
                iteration = 1;
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
            networks = 0;
        }else if(line[0] === "networks"){
            tmpNetworks[networks] = {};
            tmpNetworks[networks]["type"] = line[1];
            tmpNetworks[networks]["subtype"] = line[2];
            tmpNetworks[networks]["bandwidth"] = line[3];
            tmpNetworks[networks]["signalStrength"] = line[4];
            tmpNetworks[networks]["errorRate"] = line[5];
            tmpNetworks[networks]["datetime_unix"] = line[6];
            tmpNetworks[networks]["datetime_unix"] = line[7];
            networks++;
        }else if(line[0] === "bandwidth"){
            tmpArray["networks"] = tmpNetworks;
            tmpArray["bandwidth"] = {};
            tmpArray["bandwidth"]["datetimeStart_unix"] = line[1];
            tmpArray["bandwidth"]["datetimeStart_human"] = line[2];
            tmpArray["bandwidth"]["file_size"] = line[3];
            tmpArray["bandwidth"]["file_size_extrapolated"] = line[4];
            tmpArray["bandwidth"]["datetimeEnd_unix"] = line[5];
            tmpArray["bandwidth"]["datetimeEnd_human"] = line[6];
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

/*for(var line = 0; line < lines.length; line++){
    var split = lines[line].split(';');
    if(split[0] === "version"){
        retArray["version"] = split[1];
    }else if(split [0] === "location"){
        deep++;
        var tmpArray = {};
        tmpArray["x"] = split[1];
        tmpArray["y"] = split[2];
        tmpArray["height"] = split[3];
        tmpArray["id"] = split[4];
        retArray["obj"+deep] = tmpArray;
        network = 0;
    }else if(split[0] === "networks"){
        var tmpArray = {};
        tmpArray["type"] = split[1];
        tmpArray["netwok_type"] = split[2];
        tmpArray["value_1"] = split[3];
        tmpArray["value_2"] = split[4];
        tmpArray["value_3"] = split[5];
        tmpArray["id"] = split[6];
        tmpArray["datetime"] = split[7];
        retArray[deep]["network"+network] = tmpArray;
        network++;
    }else if(split[0] === "bandwidth"){
        var tmpArray = {};
        tmpArray["id"] = split[1];
        tmpArray["start_datetime"] = split[2];
        tmpArray["value_1"] = split[3];
        tmpArray["value_2"] = split[4];
        tmpArray["value_3"] = split[5];
        tmpArray["end_datetime"] = split[6];
        retArray[deep]["bandwidth"] = tmpArray;
    }else if(split[0] === "battery"){
        var tmpArray = {};
        tmpArray["value_1"] = split[1];
        tmpArray["value_2"] = split[2];
        tmpArray["id"] = split[3];
        tmpArray["datetime"] = split[4];
        retArray[deep]["battery"] = tmpArray;
    }
}*/