/**
 * eventHandler.js
 * Hier können vorher registrierte events programmiert werden
 */
var handleDragOver = function(e){
  e.stopPropagation();
  e.preventDefault();
}
var handleDrop = function(e){
  e.stopPropagation();
  e.preventDefault();
  var files = e.target.files || e.dataTransfer.files;

  for (var i = 0, f; f = files[i]; i++) {
    //parseFile(f);
  }
}
var performFilter = function(){
  alert($id('select-network').getPropertyValue("value"));
}