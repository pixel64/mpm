/**
 * init.js
 * Verantwortlich für die initialisierung aller Komponenten
 */
var InitDragAndDrop = function(){
  $id("dropzone").addEventListener("dragover", handleDragOver, false);
  $id("dropzone").addEventListener("drop", handleDrop, false);
}
