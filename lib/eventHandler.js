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
  var jsonresult;
    if(worker == null)  worker = new Worker('worker.js');
    worker.onmessage = function(event){
    var result = event.data;
      var tmpArray = JSON.parse(result);
      filesAsArray[objectLength(filesAsArray)]=tmpArray;
  }
  var files = e.target.files || e.dataTransfer.files;
  worker.postMessage({'files':files});
}
var performFilter = function(){
  filterNetwork("EDGE");
}