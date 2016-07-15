/**
 * Created by pixel on 14.07.16.
 */
var InitDragAndDrop = function(){
  $id("dropzone").addEventListener("dragover", handleDragOver, false);
  $id("dropzone").addEventListener("drop", handleDrop, false);
}
