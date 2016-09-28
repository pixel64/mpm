/**
 * Handling of open Streetmap
 */
var map;
var layer_mapnik;
var layer_tah;
var layer_markers;

function drawmap() {
    OpenLayers.Lang.setCode('de');

    // Startposition und Zoomstufe der Karte
    var lon = 8.7321;
    var lat = 50.3398;
    var zoom = 10;

    map = new OpenLayers.Map('map', {
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.PanZoomBar()],
        maxExtent:
            new OpenLayers.Bounds(-20037508.34,-20037508.34,
                20037508.34, 20037508.34),
        numZoomLevels: 18,
        maxResolution: 156543,
        units: 'meters'
    });

    layer_zuege = new OpenLayers.Layer.OSM.TransportMap("Bahnkarte");
    layer_markers = new OpenLayers.Layer.Markers("Address", { projection: new OpenLayers.Projection("EPSG:4326"),
        visibility: true, displayInLayerSwitcher: false });

    map.addLayers([layer_zuege, layer_markers]);
    jumpTo(lon, lat, zoom);

    // Position des Markers
    addMarker(layer_markers, 6.641389, 49.756667, popuptext);
}