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
      customAlert("Daten eingelesen");
      setMapToCenter();
    }
  var files = e.target.files || e.dataTransfer.files;
  worker.postMessage({'files':files});
}

var setMapToCenter = function(){
  if (sortedFilesArray.length > 0) {
    var miny = 2000000;
    var maxy = -2000000;
    var minx = 2000000;
    var maxx = -2000000;

    // setCenter(sortedFilesArray[Math.floor(sortedFilesArray.length/2)][startLocation]["y"],sortedFilesArray[Math.floor(sortedFilesArray.length/2)][startLocation]["y"],15);
    for (var i = 0; i < sortedFilesArray.length; i++) {
      if (sortedFilesArray[i]["startLocation"]["y"] < miny) miny = sortedFilesArray[i]["startLocation"]["y"];
      if (sortedFilesArray[i]["startLocation"]["y"] > maxy) maxy = sortedFilesArray[i]["startLocation"]["y"];
      if (sortedFilesArray[i]["startLocation"]["x"] < minx) minx = sortedFilesArray[i]["startLocation"]["x"];
      if (sortedFilesArray[i]["startLocation"]["x"] > maxx) maxx = sortedFilesArray[i]["startLocation"]["x"];
    }
    setCenter((+miny+ +maxy)/2.0,(+minx+ +maxx)/2.0, 11);
  }

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
  drawdataonmap(displaytype);
}

var drawdataonmap = function (type) {
  removeLayers();
  if (sortedFilesArray.length > 0) {

    // setCenter(sortedFilesArray[Math.floor(sortedFilesArray.length/2)][startLocation]["y"],sortedFilesArray[Math.floor(sortedFilesArray.length/2)][startLocation]["y"],15);
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
      if (type == 'bandwidth') {
        addCircle(sortedFilesArray[i]["startLocation"]["y"], sortedFilesArray[i]["startLocation"]["x"], Math.floor(sortedFilesArray[i]["bandwidth"]["value"]), color);
      }
      else if (type == 'signal') {
        addCircle(sortedFilesArray[i]["startLocation"]["y"], sortedFilesArray[i]["startLocation"]["x"], Math.floor(sortedFilesArray[i]["signal"] * 40), color);
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

var showStatistics = function(){
  if($id("overlay-diagram").style.display == "block"){
    $id("overlay-diagram").style.display = "none";
  }
  $id("overlay-statistics").style.display = "block";
  calculateStatistics();
  drawStatistics();
}
var closeStatistics = function(){
  $id("overlay-statistics").style.display = "none";
}

var showDiagram = function(){
  if($id("overlay-statistics").style.display == "block"){
    $id("overlay-statistics").style.display = "none";
  }
  $id("overlay-diagram").style.display = "block";
  calculateStatistics();
  drawDiagrams();
}
var closeDiagram = function(){
  $id("overlay-diagram").style.display = "none";
}