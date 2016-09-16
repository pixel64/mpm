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
}