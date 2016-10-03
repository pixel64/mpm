/**
 * eventHandler.js
 * Hier können vorher registrierte events programmiert werden
 */
var worker = null;
var handleDragOver = function(e){
  e.stopPropagation();
  e.preventDefault();
}
var handleDrop = function(e){
  e.stopPropagation();
  e.preventDefault();
    if(worker == null)  worker = new Worker('worker.js');
    $id("overlay-block").style.display = "block";
    worker.onmessage = function(event){
    var result = event.data;
      var tmpArray = JSON.parse(result);
      filesAsArray[objectLength(filesAsArray)]=tmpArray;
      performFilter();
      $id("overlay-block").style.display = "none";
      customAlert("Daten eingelesen");      drawdataonmap(displaytype);  }
  var files = e.target.files || e.dataTransfer.files;
  worker.postMessage({'files':files});
}
var performFilter = function(){
  var error = "";
  var network = $id("select_network");
  var startTimeSelect = $id("select_starttime");
  var valueStartTime = Math.floor(startTimeSelect.options[startTimeSelect.selectedIndex].value);
  var endTimeSelect = $id("select_endtime");
  var valueEndTime = Math.floor(endTimeSelect.options[endTimeSelect.selectedIndex].value);
  if(valueStartTime > valueEndTime){
    error = true;
    customAlert("Die Start Zeit liegt über der End Zeit",1);
  }
  if(!error){
    filterNetwork(network.options[network.selectedIndex].value);
    filterDaytime(valueStartTime,valueEndTime);
    if($id("select_bandwidth").value > 0){
      filterBandwidth($id("select_bandwidth").value);
    }
    if($id("select_signal").value > 0){
      filterSignal($id("select_signal").value);
    }
  }
}

var drawdataonmap = function(type){
  if(sortedFilesArray.length > 0 ) {
    removeLayers();
   // setCenter(sortedFilesArray[Math.floor(sortedFilesArray.length/2)][startLocation]["y"],sortedFilesArray[Math.floor(sortedFilesArray.length/2)][startLocation]["y"],15);
    if (type == 'bandwidth') {
      for (var i = 0; i < sortedFilesArray.length; i++) {
        var color = 'red';
        switch (sortedFilesArray[i]["network"]) {
          case "GRPS":
            color = 'brown';
            break;
          case "EDGE":
            color = 'red';
            break;

          case "UMTS":
            color = 'orange';
            break;
          case "HSPA+":
            color = 'yellow';
            break;
          case "LTE":
            color = 'green';
            break;
          default:
            color = 'black';
            break;
        }
        addCircle(sortedFilesArray[i]["startLocation"]["y"], sortedFilesArray[i]["startLocation"]["x"], Math.floor(sortedFilesArray[i]["bandwidth"]["value"]/2), color);
      }
    } else if (type == 'signal') {
      for (var i = 0; i < sortedFilesArray.length; i++) {
        var color = 'red';
        switch (sortedFilesArray[i]["network"]) {
          case "GRPS":
            color = 'brown';
            break;
          case "EDGE":
            color = 'red';
            break;

          case "UMTS":
            color = 'orange';
            break;
          case "HSPA+":
            color = 'yellow';
            break;
          case "LTE":
            color = 'green';
            break;
          default:
            color = 'black';
            break;
        }
        addCircle(sortedFilesArray[i]["startLocation"]["y"], sortedFilesArray[i]["startLocation"]["x"], Math.floor(sortedFilesArray[i]["signal"] *20), color);
      }

    }
  }
}

var setDisplayType = function(value){
  if(value){
    displaytype = "bandwidth";
  } else {
    displaytype = "signal";
  }
  drawdataonmap(displaytype);
}