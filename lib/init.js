/**
 * init.js
 * Verantwortlich für die initialisierung aller Komponenten
 */
var InitDragAndDrop = function(){
  $id("map").addEventListener("dragover", handleDragOver, false);
  $id("map").addEventListener("drop", handleDrop, false);
}
