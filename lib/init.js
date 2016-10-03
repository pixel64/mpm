/**
 * init.js
 * Verantwortlich für die initialisierung aller Komponenten
 */

var displaytype = "bandwidth";
var filesAsArray = {};
var sortedFilesArray = [];
var InitDragAndDrop = function(){
  document.body.addEventListener("dragover", handleDragOver, false);
  document.body.addEventListener("drop", handleDrop, false);
}