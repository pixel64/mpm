/**
 * init.js
 * Verantwortlich für die initialisierung aller Komponenten
 */

var filesAsArray = {};
var InitDragAndDrop = function(){
  document.body.addEventListener("dragover", handleDragOver, false);
  document.body.addEventListener("drop", handleDrop, false);

}
