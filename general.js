/**
 * Created by pixel on 14.07.16.
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
}/**
 * Created by pixel on 14.07.16.
 */
var $id = function(id){
    return document.getElementById(id);
}
/**
 * Created by pixel on 14.07.16.
 */
var InitDragAndDrop = function(){
  $id("dropzone").addEventListener("dragover", handleDragOver, false);
  $id("dropzone").addEventListener("drop", handleDrop, false);
}
