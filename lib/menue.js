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
}

var updateSignalNumber = function(value) {
    $id("signal_select_value").innerHTML = "Minimale Signalstärke: "+value;
}
var updateBandwithNumber = function(value) {
    $id("bandwith_select_value").innerHTML = "Minimale Bandbreite: "+value;
}