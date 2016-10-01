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
            for(var line = 0; line < lines.length; line++){
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
            }
            var stringObj = JSON.stringify(retArray);
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