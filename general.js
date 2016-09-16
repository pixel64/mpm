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
/**
 * Created by pixel on 08.09.16.
 */
var initMenue = function () {

}
var toggleMenue = function () {
    var style = window.getComputedStyle($id("overlay-menue"));
    var display = style.getPropertyValue("display");
    if(display == "block"){
        $id("bu_menue").innerHTML = "Open";
        $id("overlay-menue").style.display = 'none';
    }else{
        $id("bu_menue").innerHTML = "Close";
        $id("overlay-menue").style.display = 'block';
    }
}/**
 * Created by pixel on 16.09.16.
 */
var customAlert = function(text,type){
        document.getElementById("message").innerHTML= render_msg(text, type);
}

var render_msg = function (text,type) {

    if(type == 1){
        var text = "<strong>FEHLER</strong> " + text;
        var div = '<div class="alert alert-danger overlay-message" role="alert">';
    }else{
        var text = "<strong>INFO</strong> " + text;
        var div = '<div class="alert alert-info overlay-message" role="alert">';
    }
    div += text;
    div += "<button class='btn btn-default' onclick='close_msg()'>Schließen</button></div>";
    return div;
}

var close_msg = function () {
    document.getElementById("message").innerHTML = "";
}