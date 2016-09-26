var jsons = "";
var loading = false;
parseFile = function(file){
    var text = "";
    var lines;
    if(file.type.match('text.*')){
        var reader = new FileReader();
        reader.onload = function(e){
            lines = this.result.split('\n');
            for(var line = 0; line < lines.length; line++){
                jsons += lines[line];
            }
            postMessage(jsons);
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
        parseFile(files[i]);

    }
}