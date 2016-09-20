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
}/**
 * general.js
 * Verantwortlich für alles allgemeine
 */
var $id = function(id){
    return document.getElementById(id);
}
/**
 * init.js
 * Verantwortlich für die initialisierung aller Komponenten
 */
var InitDragAndDrop = function(){
  $id("dropzone").addEventListener("dragover", handleDragOver, false);
  $id("dropzone").addEventListener("drop", handleDrop, false);
}
/**
 * menue.js
 * verantwortlich für das Menü
 */
var initMenue = function () {

}
var toggleMenue = function () {
    var style = window.getComputedStyle($id("overlay-menue"));
    var display = style.getPropertyValue("display");
    if(display == "block"){
        $id("bu_menue").innerHTML = "Menü";
        $id("overlay-menue").style.display = 'none';
    }else{
        $id("bu_menue").innerHTML = "<<";
        $id("overlay-menue").style.display = 'block';
    }
}

var toggleFilter = function () {
    var style = window.getComputedStyle($id("overlay-filter"));
    var display = style.getPropertyValue("display");
    if(display == "block"){
        $id("bu_filter").innerHTML = "Filter";
        $id("overlay-filter").style.display = 'none';
    }else{
        $id("bu_filter").innerHTML = ">>";
        $id("overlay-filter").style.display = 'block';
    }
}/**
 * message.js
 * Verantwortlich für custom alerts
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