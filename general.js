/**
 * init.js
 * Verantwortlich für die initialisierung aller Komponenten
 */

var filesAsArray = {};
var sortedFilesArray = {};
var InitDragAndDrop = function(){
  document.body.addEventListener("dragover", handleDragOver, false);
  document.body.addEventListener("drop", handleDrop, false);

}
/**
 * eventHandler.js
 * Hier können vorher registrierte events programmiert werden
 */
var worker = null;
var handleDragOver = function(e){
  e.stopPropagation();
  e.preventDefault();
}
var handleDrop = function(e){
  e.stopPropagation();
  e.preventDefault();
  var jsonresult;
    if(worker == null)  worker = new Worker('worker.js');
    worker.onmessage = function(event){
    var result = event.data;
      var tmpArray = JSON.parse(result);
      filesAsArray[objectLength(filesAsArray)]=tmpArray;
  }
  var files = e.target.files || e.dataTransfer.files;
  worker.postMessage({'files':files});
}
var performFilter = function(){
  filterNetwork("EDGE");
}/**
 * general.js
 * Verantwortlich für alles allgemeine
 */
var $id = function(id){
    return document.getElementById(id);
}
function objectLength(obj) {
    var result = 0;
    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            // or Object.prototype.hasOwnProperty.call(obj, prop)
            result++;
        }
    }
    return result;
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
}

var updateSignalNumber = function(value) {
    customAlert(value);
    $id("signal_select_value").innerHTML = "Minimale Signalstärke: "+value;
}
var updateBandwithNumber = function(value) {
    customAlert(value);
    $id("bandwith_select_value").innerHTML = "Minimale Bandbreite: "+value;
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
}/**
 * Created by Alexander on 23.09.2016.
 */
function jumpTo(lon, lat, zoom) {
    var x = Lon2Merc(lon);
    var y = Lat2Merc(lat);
    map.setCenter(new OpenLayers.LonLat(x, y), zoom);
    return false;
}

function Lon2Merc(lon) {
    return 20037508.34 * lon / 180;
}

function Lat2Merc(lat) {
    var PI = 3.14159265358979323846;
    lat = Math.log(Math.tan( (90 + lat) * PI / 360)) / (PI / 180);
    return 20037508.34 * lat / 180;
}

function addMarker(layer, lon, lat, popupContentHTML) {

    var ll = new OpenLayers.LonLat(Lon2Merc(lon), Lat2Merc(lat));
    var feature = new OpenLayers.Feature(layer, ll);
    feature.closeBox = true;
    feature.popupClass = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {minSize: new OpenLayers.Size(300, 180) } );
    feature.data.popupContentHTML = popupContentHTML;
    feature.data.overflow = "hidden";

    var marker = new OpenLayers.Marker(ll);
    marker.feature = feature;

    var markerClick = function(evt) {
        if (this.popup == null) {
            this.popup = this.createPopup(this.closeBox);
            map.addPopup(this.popup);
            this.popup.show();
        } else {
            this.popup.toggle();
        }
        OpenLayers.Event.stop(evt);
    };
    marker.events.register("mousedown", feature, markerClick);

    layer.addMarker(marker);
    map.addPopup(feature.createPopup(feature.closeBox));
}

function getCycleTileURL(bounds) {
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit)
    {
        return null;
    }
    else
    {
        x = ((x % limit) + limit) % limit;

        return this.url + z + "/" + x + "/" + y + "." + this.type;
    }
}var map;
var standard_zoom = 10;
var all_layers = [];

var standard_style = {
    strokeColor: 'black',
    strokeOpacity: 1,
    strokeWidth: 2,
    fillOpacity: 0.2,
    fillColor: "${color}"
}

function drawmap() {
    OpenLayers.Lang.setCode('de');

    // Startposition und Zoomstufe der Karte
    var lon = 8.7321;
    var lat = 50.3398;
    var zoom = 10;
    map = new OpenLayers.Map("map", {
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            //new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.Attribution()
        ],
        maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
        maxResolution: 156543.0399,
        numZoomLevels: 19,
        units: 'meters',
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326")
    });

    // Define the map layer
    // Here we use a predefined layer that will be kept up to date with URL changes
    map.addLayer(new OpenLayers.Layer.OSM.TransportMap("Bahnkarte"));
    addCircle(lon,lat,10000, 'red');
    setCenter(lon,lat,zoom);
}

function setCenter(lng,lat, zoom) {
    map.setCenter(
        new OpenLayers.LonLat(lng || -47.9355023, lat || -15.7603797).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),
        zoom || 5
    );
}

function addCircle(lng, lat, radius, color) {
    var lonLat = new OpenLayers.LonLat(lng, lat).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    );

    var layer = new OpenLayers.Layer.Vector("", {
        styleMap: new OpenLayers.StyleMap(
            standard_style
        )
    });
    var point = new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat);
    var circle = OpenLayers.Geometry.Polygon.createRegularPolygon(point, radius, 40, 0);



    layer.addFeatures([new OpenLayers.Feature.Vector(circle,

        {
            name: "ich_brauch_vielleicht_keinen_namen",
            color: color
        }
        //, standard_style
    )]);
    map.addLayer(layer);
    all_layers.push(layer);
}

function removeLayers() {
    while (all_layers.length > 0) {
        map.removeLayer(all_layers.pop());
    }
}

/**
 * filter.js
 * This file is ment to filter data.
 */

function filterNetwork(network){
    var filesArrayLength = objectLength(filesAsArray);
    for(var i = 0; i < filesArrayLength; i++){
        var locationsAsArray = filesAsArray[i];
        var locationsArrayLength = objectLength(locationsasArray);
        for(var j = 0; j < locationsArrayLength; j++){
            if(locationsAsArray[j]["entry"] === "network"){
                alert(locationsAsArray[j]["entry"])
            }
        }
    }
}