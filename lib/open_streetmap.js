var map;
var standard_zoom = 10;
var all_layers = [];
var lon;
var lat;

var standard_style = {
    strokeColor: 'black',
    strokeOpacity: 1,
    strokeWidth: 0,
    fillOpacity: 0.2,
    fillColor: "${color}"
}

function drawmap() {
    OpenLayers.Lang.setCode('de');

    // Zoomstufe der Karte
    var zoom = 12;
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

