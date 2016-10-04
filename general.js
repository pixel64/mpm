/**
 * init.js
 * initialisiert die Anwendung
 */
var displaytype = "bandwidth";
var filesAsArray = {};
var sortedFilesArray = [];
var sortedFilesMapArray = [];
/**
 * Initialisiert die Drag&Drop-funktionalität, indem es Eventlistener an den document.body anfügt
 */
var InitDragAndDrop = function(){
  document.body.addEventListener("dragover", handleDragOver, false);
  document.body.addEventListener("drop", handleDrop, false);
}
/**
 * locate.js
 *
 * Zum feststellen der Geolocation
 */
/**
 * Fragt die Geolocation ab. Falls sie nicht abgefragt werden konnte, kommt eine Fehlermeldung und die Koordinaten werden auf eine standardpostiion
 */
var locate = function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition,showError);
    }
    else {
        alert("Browser unterstützt Geolocation nicht!");
        // Position Friedberg als Location
        lon = 8.7321;
        lat = 50.3398;
        drawmap();
    }
}

/**
 * speichert die Koordinaten einer position in den globalen positionskoordinaten lon und lat
 *
 * @param position die zu speichernde Position
 */
function getPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    drawmap();
}


/**
 * Zeigt eine Fehlermeldung an
 *
 * @param error der Fehler, der die Fehlermeldung auslöst
 */
function showError(error) {
    lon = 8.7321; //Friedberg
    lat = 50.3398;
    drawmap();
    switch(error.code) {
        case error.PERMISSION_DENIED:
            customAlert("Nutzer hat den Zugriff auf die Position abgelehnt.",1)
            break;
        case error.POSITION_UNAVAILABLE:
            customAlert("Keine Information zum Standort verfügbar.",1)
            break;
        case error.TIMEOUT:
            customAlert("Die Anfrage der Standortbestimmung hat zu lange gedauert.",1)
            break;
        case error.UNKNOWN_ERROR:
            customAlert("Bei der Standortbestimmung ist ein unbekannter Fehler aufgetreten..",1)
            break;
    }
}
/**
 * eventHandler.js
 * Hier können vorher registrierte events programmiert werden
 */
var worker = null;

/**
 * Eventhandling für das DragOver event
 *
 * @param e das erzeugte event
 */
var handleDragOver = function(e){
  e.stopPropagation();
  e.preventDefault();
}

/**
 * Eventhandling für das ende des Drag&Drop events
 *
 * @param e das Event, das beim drop erzeugt wurde
 */
var handleDrop = function(e){
  e.stopPropagation();
  e.preventDefault();
    if(worker == null)  worker = new Worker('worker.js');
    $id("overlay-block").style.display = "block";
    worker.onmessage = function(event){
        $id("overlay-block").style.display = "none";
    var result = event.data;
        if(result.hasOwnProperty("error")){
            customAlert(result.error,1);
        }
        else {
            var tmpArray = JSON.parse(result);
            filesAsArray[objectLength(filesAsArray)] = tmpArray;
            performFilter();
            $id("overlay-block").style.display = "none";
            customAlert("Daten eingelesen");
            setMapToCenter();
        }
    }
  var files = e.target.files || e.dataTransfer.files;
  worker.postMessage({'files':files});
}

/**
 * Funktion, die die Map auf die Mitte der eingelesenen Daten zentriert
 */
var setMapToCenter = function(){
  if (sortedFilesArray.length > 0) {
    var miny = 2000000;
    var maxy = -2000000;
    var minx = 2000000;
    var maxx = -2000000;
      //bestimmung der Randpunkte
    for (var i = 0; i < sortedFilesArray.length; i++) {
      if (sortedFilesArray[i]["startLocation"]["y"] < miny) miny = sortedFilesArray[i]["startLocation"]["y"];
      if (sortedFilesArray[i]["startLocation"]["y"] > maxy) maxy = sortedFilesArray[i]["startLocation"]["y"];
      if (sortedFilesArray[i]["startLocation"]["x"] < minx) minx = sortedFilesArray[i]["startLocation"]["x"];
      if (sortedFilesArray[i]["startLocation"]["x"] > maxx) maxx = sortedFilesArray[i]["startLocation"]["x"];
    }
    setCenter((+miny+ +maxy)/2.0,(+minx+ +maxx)/2.0, 11);
  }

}

/**
 * Funktion, die die eingelesenen Daten nach den Filtereinstellungen filtert.
 * speichert alle gefilterten daten in sortedFilesArray und die Daten des Momentanen Bildausschnittes in sortedFilesMapArray.
 */
var performFilter = function(){
  var error = "";
  var network = $id("select_network");
  var startTimeSelect = $id("select_starttime");
  var valueStartTime = Math.floor(startTimeSelect.options[startTimeSelect.selectedIndex].value);
  var endTimeSelect = $id("select_endtime");
  var valueEndTime = Math.floor(endTimeSelect.options[endTimeSelect.selectedIndex].value);

    filterNetwork(network.options[network.selectedIndex].value);
    filterDaytime(valueStartTime,valueEndTime);
    if($id("select_bandwidth").value > 0){
      filterBandwidth($id("select_bandwidth").value);
    }
    if($id("select_signal").value > 0){
      filterSignal($id("select_signal").value);
    }

  filterMapLocation();
  drawdataonmap(displaytype);
}

/**
 * Malt die gefilterten Daten auf die Karte
 *
 * @param type Der Anzeigetyp. 'bandwith' für anzeige von Netztyp und Bandbreite, 'signal' für Netztyp und Signalstärke
 */
var drawdataonmap = function (type) {
  removeLayers();
  if (sortedFilesArray.length > 0) {

    // setCenter(sortedFilesArray[Math.floor(sortedFilesArray.length/2)][startLocation]["y"],sortedFilesArray[Math.floor(sortedFilesArray.length/2)][startLocation]["y"],15);
    for (var i = 0; i < sortedFilesArray.length; i++) {
      var color = 'red';

      switch (sortedFilesArray[i]["network"]) {
        case "GRPS":
          color = 'brown';
          break;
        case "EDGE":
          color = 'red';
          break;

        case "UMTS":
          color = 'orange';
          break;
        case "HSPA+":
          color = 'yellow';
          break;
        case "LTE":
          color = 'green';
          break;
        default:
          color = 'black';
          break;
      }
      if (type == 'bandwidth') {
        addCircle(sortedFilesArray[i]["startLocation"]["y"], sortedFilesArray[i]["startLocation"]["x"], Math.floor(sortedFilesArray[i]["bandwidth"]["value"]), color);
      }
      else if (type == 'signal') {
        addCircle(sortedFilesArray[i]["startLocation"]["y"], sortedFilesArray[i]["startLocation"]["x"], Math.floor((sortedFilesArray[i]["signal"]+3) * 40), color);
      }
    }
  }
}

/**
 * Stellt den Anzeigetyp ein.
 *
 * @param value boolean für den Displaytyp. true für Bandbreite, false für Signalstärke
 */
var setDisplayType = function(value){
  if(value){
    displaytype = "bandwidth";
  } else {
    displaytype = "signal";
  }
  drawdataonmap(displaytype);
}

/**
 * Zeigt das Statistiken-Overlay an
 */
var showStatistics = function(){
  if($id("overlay-diagram").style.display == "block"){
    $id("overlay-diagram").style.display = "none";
  }
  $id("overlay-statistics").style.display = "block";
  calculateStatistics();
  drawStatistics();
}
var closeStatistics = function(){
  $id("overlay-statistics").style.display = "none";
}

/**
 * Zeigt das Diagramme-Overlay an
 */
var showDiagram = function(){
  if($id("overlay-statistics").style.display == "block"){
    $id("overlay-statistics").style.display = "none";
  }
  $id("overlay-diagram").style.display = "block";
  calculateStatistics();
  drawDiagrams();
}
var closeDiagram = function(){
  $id("overlay-diagram").style.display = "none";
}
/**
 * general.js
 * Verantwortlich für alles allgemeine
 */

/**
 * Shortcut um Elemente über die id zu bekommen
 *
 * @param id die ID des Elements
 * @returns {Element} Das DOM-Element mit der übergebenen ID
 */
var $id = function(id){
    return document.getElementById(id);
}

/**
 * Berechnet die Länge eines Objekts
 *
 * @param obj das Objekt, dessen Länge bestimmt werden soll
 * @returns {number} die Länge des Objekts
 */
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

/**
 * Initialisiert das Menü
 */
var initMenue = function () {

}

/**
 * Blendet das Menü ein und aus
 */
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
/**
 * Blendet das Filtermenü ein und aus
 */
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

/**
 * Schreibt die Minimale Signalstärke numerisch vor den Slider
 * @param value Wert des sliders
 */
var updateSignalNumber = function(value) {
    $id("signal_select_value").innerHTML = "Minimale Signalstärke: "+value;
}

/**
 * Schreibt die Minimale Bandbreite numerisch vor den Slider
 * @param value Wert des sliders
 */
var updateBandwithNumber = function(value) {
    $id("bandwith_select_value").innerHTML = "Minimale Bandbreite: "+value + " Kbps";
}/**
 * message.js
 * Verantwortlich für custom alerts
 */

/**
 * Blendet eine Fehlermeldung oder Notifikation ein
 * @param text Text der Meldung
 * @param type 1 für Error, 0 für Info
 */
var customAlert = function(text,type){
        document.getElementById("message").innerHTML= render_msg(text, type);
}

/**
 * Baut den HTML-Code einer Fehlermeldung/Notifikation zusammen
 * @param text Text der Meldung
 * @param type 1 für Error, 0 für Info
 * @returns {string|string} der Alert als html-code.
 */
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

/**
 * schließt eine Fehlermeldung oder Notifikation
 */
var close_msg = function () {
    document.getElementById("message").innerHTML = "";
}
/**
 * Quelle für die folgenden Methoden:
 * http://wiki.openstreetmap.org/wiki/Die_JavaScript_Dateien
 */

/**
 * Wandelt Longitude in Mercator-koordinate um
 * @param lon Longitude
 * @returns {number} Mercator-Wert der Longitude
 */
function Lon2Merc(lon) {
    return 20037508.34 * lon / 180;
}
/**
 * Wandelt Latitude in Mercator-koordinate um
 * @param lon Latitude
 * @returns {number} Mercator-Wert der Latitude
 */
function Lat2Merc(lat) {
    var PI = 3.14159265358979323846;
    lat = Math.log(Math.tan( (90 + lat) * PI / 360)) / (PI / 180);
    return 20037508.34 * lat / 180;
}

/**
 * openstreetmap.js
 * bearbeitet die Openstreetmap
 */
var map;
var standard_zoom = 10;
var all_layers = [];
var lon;
var lat;

var standard_style = {
    strokeColor: 'black',
    strokeOpacity: 1,
    strokeWidth: 0.2,
    fillOpacity: 0.3,
    fillColor: "${color}"
}

/**
 * Baut die Karte auf
 */
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
    map.events.register("moveend", map, function(){
        filterMapLocation();
    });

    map.events.register("zoomend", map, function(){
        filterMapLocation();
    });
    setCenter(lon,lat,zoom);
}

/**
 * zentriert die Karte auf einen Punkt mit bestimmtem Zoom
 * @param lng longitude
 * @param lat latitude
 * @param zoom zoomfaktor
 */
function setCenter(lng,lat, zoom) {
    map.setCenter(
        new OpenLayers.LonLat(lng || -47.9355023, lat || -15.7603797).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),
        zoom || 5
    );
}

/**
 * Fügt der Karte einen Kreis hinzu
 * @param lng Longitude des Kreismittelpunkts
 * @param lat Latitude des Kreismittelpunkts
 * @param radius Radius des Kreises
 * @param color Farbe des Kreises
 */
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

/**
 * Entfernt alle Kreise von der Karte
 */
function removeLayers() {
    while (all_layers.length > 0) {
        map.removeLayer(all_layers.pop());
    }
}

/**
 * filter.js
 * Hier wird das Filter handling durchgeführt
 */

/**
 * initialisiert die Daten vor dem Filtern
 */
var initFilesForFilter = function(){
    filterNetwork("all");
}

/**
 * Filtert die Daten nach dem Netzwerktyp
 * @param network Netzwerktyp, nach dem gefiltert werden soll
 */
var filterNetwork = function(network){
    var filesArrayLength = objectLength(filesAsArray);
    sortedFilesArray = [];
    if(network === "all"){
        for(var i = 0; i < filesArrayLength; i++){
            var valuesArray = filesAsArray[i];
            var valuesArrayLength = objectLength(valuesArray);
            for (var j = 0; j < valuesArrayLength; j++) {
                sortedFilesArray.push(valuesArray[j]);
            }
        }
    }else {
        for (var i = 0; i < filesArrayLength; i++) {
            var valuesArray = filesAsArray[i];
            var valuesArrayLength = objectLength(valuesArray);
            for (var j = 0; j < valuesArrayLength; j++) {
                if (valuesArray[j]["network"] === network) {
                    sortedFilesArray.push(valuesArray[j]);
                }
            }
        }
    }
}
/**
 * Filtert die Daten nach einer minimalen Bandbreite
 * @param bandwidth die Minimalbandbreite
 */
var filterBandwidth = function(bandwidth){
    var valuesArrayLength = objectLength(sortedFilesArray);
    var tmpSortedArray = [];
    for (var i = 0; i < valuesArrayLength; i++) {
        if (sortedFilesArray[i]["bandwidth"]["value"] >= bandwidth) {
            tmpSortedArray.push(sortedFilesArray[i]);
        }
    }
    sortedFilesArray = tmpSortedArray;
}
/**
 * Filtert die Daten nach minimaler Signalstärke
 * @param signal die minimale Signalstärke
 */
var filterSignal = function(signal){
    var valuesArrayLength = objectLength(sortedFilesArray);
    var tmpSortedArray = [];
    for (var i = 0; i < valuesArrayLength; i++) {
        if (sortedFilesArray[i]["signal"] >= signal) {
            tmpSortedArray.push(sortedFilesArray[i]);
        }
    }
    sortedFilesArray = tmpSortedArray;
}

/**
 * Filtert die Daten nach einem Uhrzeitbereich, auch über die Tagesgrenze (wenn Startzeit nach der Endzeit liegt.
 * @param from Startuhrzeit
 * @param to Enduhrzeit
 */
var filterDaytime = function(from,to){
    var valuesArrayLength = objectLength(sortedFilesArray);
    var tmpSortedArray = [];
    for (var i = 0; i < valuesArrayLength; i++) {
        var date = new Date(sortedFilesArray[i]["startLocation"]["datetime_unix"] * 1000);
        var starttime = date.getHours();
        if((starttime >= from && starttime <= to && from < to)||(to< from && starttime >= from)||(to < from && starttime <= to)) {
            tmpSortedArray.push(sortedFilesArray[i]);
        }
    }
    sortedFilesArray = tmpSortedArray;
}

/**
 * filtert die gefilterten Daten nach denen, die im Bildausschnitt liegen
 */
var filterMapLocation = function(){
    var valuesArrayLength = objectLength(sortedFilesArray);
    var tmpSortedArray = [];
    var bounds = map.getExtent();
    for (var i = 0; i < valuesArrayLength; i++) {
        var x = Lon2Merc(parseFloat(sortedFilesArray[i]['startLocation']['y']));
        var y = Lat2Merc(parseFloat(sortedFilesArray[i]['startLocation']['x']));
        if(bounds.contains(x,y)) {
            tmpSortedArray.push(sortedFilesArray[i]);
        }
    }
    sortedFilesMapArray = tmpSortedArray;
    calculateStatistics();
    drawStatistics();
    drawDiagrams();
}
/**
 * diagrams.js
 */

var totalcount;
var highestbandwidth;
var lowestbandwidth;
var highestsignalstrength;
var lowestsignalstrength;
var edgecount;
var averageedge;
var averageedgesignal;
var gprscount;
var averagegprs;
var averagegprssignal;
var umtscount;
var averageumts;
var averageumtssignal;
var hspacount;
var averagehspa;
var averagehspasignal;
var ltecount;
var averagelte;
var averageltesignal;
var unknowncount;
var averageunknown;
var averageunknownsignal;
var averagebandwidth;
var averagesignalstrength;

/**
 * berechnet Statistiken zu den Datenpunkten im Bildausschnitt
 */
var calculateStatistics = function(){
    if(sortedFilesMapArray.length>0){
        highestbandwidth=0;
        lowestbandwidth=2000;
        highestsignalstrength=0;
        lowestsignalstrength=20;
        edgecount=0;
        gprscount=0;
        umtscount=0;
        hspacount=0;
        ltecount=0;
        unknowncount=0;
        averagebandwidth=0;
        averagesignalstrength=0;
        totalcount = 0;
        var totalbandwidth=0;
        var totalsignalstrength=0;
        var totaledge= 0;
        var totalgprs= 0;
        var totalumts= 0;
        var totalhspa= 0;
        var totallte= 0;
        var totalunknown= 0;
        var totaledgesignal= 0;
        var totalgprssignal= 0;
        var totalumtssignal= 0;
        var totalhspasignal= 0;
        var totalltesignal= 0;
        var totalunknownsignal= 0;
        for(var i=0; i <sortedFilesMapArray.length;i++){
            totalcount++;
            var bandwidth= sortedFilesMapArray[i]["bandwidth"]["value"];
            var signalstrength= Math.floor(sortedFilesMapArray[i]["signal"]);
            totalbandwidth+= +bandwidth;
            totalsignalstrength+= +signalstrength;
            switch (sortedFilesMapArray[i]["network"]) {
                case "GRPS":
                    gprscount++;
                    totalgprs+= +bandwidth;
                    totalgprssignal+= +signalstrength;
                    break;
                case "EDGE":
                    edgecount++;
                    totaledge += +bandwidth;
                    totaledgesignal +=+ signalstrength;
                    break;

                case "UMTS":
                    umtscount++;
                    totalumts += +bandwidth;
                    totalumtssignal +=+ signalstrength;
                    break;
                case "HSPA+":
                    hspacount++;
                    totalhspa += +bandwidth;
                    totalhspasignal +=+ signalstrength;
                    break;
                case "LTE":
                    ltecount++;
                    totallte += +bandwidth;
                    totalltesignal +=+ signalstrength;
                    break;
                default:
                    unknowncount++;
                    totalunknown += +bandwidth;
                    totalunknownsignal +=+ signalstrength;
                    break;
            }
            if (bandwidth>highestbandwidth) highestbandwidth= bandwidth;
            if (signalstrength>highestsignalstrength) highestsignalstrength=signalstrength;
            if (bandwidth<lowestbandwidth) lowestbandwidth = bandwidth;
            if (signalstrength<lowestsignalstrength) lowestsignalstrength = signalstrength;
        }
        averagebandwidth = totalbandwidth/totalcount;
        averagesignalstrength = totalsignalstrength/totalcount;
        averageedge = totaledge / edgecount;
        if(totaledge == 0) averageedge = 0;
        averagegprs = totalgprs / gprscount;
        if(totalgprs == 0) averagegprs = 0;
        averageumts = totalumts / umtscount;
        if(totalumts == 0) averageumts = 0;
        averagehspa = totalhspa / hspacount;
        if(totalhspa == 0) averagehspa = 0;
        averagelte = totallte / ltecount;
        if(totallte == 0) averagelte = 0;
        averageunknown = totalunknown / unknowncount;
        if(totalunknown == 0) averageunknown = 0;
        averageedgesignal = totaledgesignal / edgecount;
        if(totaledgesignal == 0) averageedgesignal = 0;
        averagegprssignal = totalgprssignal / gprscount;
        if(totalgprssignal == 0) averagegprssignal = 0;
        averageumtssignal = totalumtssignal / umtscount;
        if(totalumtssignal == 0) averageumtssignal = 0;
        averagehspasignal = totalhspasignal / hspacount;
        if(totalhspasignal == 0) averagehspasignal = 0;
        averageltesignal = totalltesignal / ltecount;
        if(totalltesignal == 0) averageltesignal = 0;
        averageunknownsignal = totalunknownsignal / unknowncount;
        if(totalunknownsignal == 0) averageunknownsignal = 0;
    }
}

/**
 * baut die Statistiken als html-Code zusammen
 */
var drawStatistics= function(){
    if(sortedFilesMapArray.length>0) {
        var text = "<p>";
        text += '<h2>Statistiken</h2><br>';
        text += 'Anzahl Messpunkte: ' + totalcount + '<br>';
        text += 'Minimale Bandbreite: ' + lowestbandwidth + ' Kbps'+ '<br>';
        text += 'Maximale Bandbreite: ' + highestbandwidth + ' Kbps'+ '<br>';
        text += 'Durchschnittliche Bandbreite: ' + averagebandwidth + ' Kbps'+ '<br>';
        text += 'Minimale Signalstärke: ' + lowestsignalstrength + '<br>';
        text += 'Maximale Signalstärke: ' + highestsignalstrength + '<br>';
        text += 'Durchschnittliche Signalstärke: ' + averagesignalstrength + '<br>';
        text += 'Anzahl EDGE: ' + edgecount + '<br>';
        text += 'Anzahl GPRS: ' + gprscount + '<br>';
        text += 'Anzahl UMTS: ' + umtscount + '<br>';
        text += 'Anzahl HSPA+: ' + hspacount + '<br>';
        text += 'Anzahl LTE: ' + ltecount + '<br>';
        text += 'Anzahl unbekanntes Netz: ' + unknowncount +'<br>';
        text += '</p>';

        $id("statistics").innerHTML=text;
    }
    else{
        $id("statistics").innerHTML="Keine Messpunkte vorhanden";
    }
}

/**
 * erstellt Diagramme aus den gefilterten Daten
 */
var drawDiagrams = function(){
    if(sortedFilesMapArray.length > 0) {
        var data = {
            labels: ['GPRS', 'EDGE', 'UMTS', 'HSPA+', 'LTE', 'Unknown'],
            series: [
                [averagegprs, averageedge, averageumts, averagehspa, averagelte, averageunknown]
            ]
        };

        var options = {
            high: 1300,
            low: 0,
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return '<big><b>' + value + '</b></big>';
                }
            },
            axisY: {
                labelInterpolationFnc: function (value, index) {
                    return '<big><b></b>' + value + " Kbps" + '</b></big>';
                }
            }
        };
        var color = 0;
        new Chartist.Bar('#chart1', data, options).on('draw', function (data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke:' + getColor(color) + '; stroke-width:40px'
                });
                color++;
                if (color >= 6) color = 0;
            }
        });
        var data2 = {
            labels: ['GPRS', 'EDGE', 'UMTS', 'HSPA+', 'LTE', 'Unknown'],
            series: [
                [averagegprssignal, averageedgesignal, averageumtssignal, averagehspasignal, averageltesignal, averageunknownsignal]
            ]
        };

        var options2 = {
            high: 15,
            low: 0,
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return '<big><b>' + value + '</b></big>';
                }
            },
            axisY: {
                labelInterpolationFnc: function (value, index) {
                    return '<big><b></b>' + value + '</b></big>';
                }
            }
        };
        var color = 0;
        new Chartist.Bar('#chart2', data2, options2).on('draw', function (data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke:' + getColor(color) + '; stroke-width:40px'
                });
                color++;
                if (color >= 6) color = 0;
            }
        });
        var data3 = {
            labels: ['GPRS', 'EDGE', 'UMTS', 'HSPA+', 'LTE', 'Unknown'],
            series: [gprscount,edgecount,umtscount,hspacount,ltecount,unknowncount],
    };

        var options3 = {
            labelInterpolationFnc: function(value) {
                return value[0]
            }
        };

        var color = 0;
        new Chartist.Pie('#chart3', data3, options3).on('draw', function (data) {
            if (data.type === 'slice') {
                data.element.attr({
                    style: 'fill:' + getColor(color) + '; stroke-width:40px'
                });
                color++;
                if (color >= 6) color = 0;
            }
        });
    }
    else {
        $id("chart1").innerHTML="";
        $id("chart2").innerHTML="";
        $id("chart3").innerHTML="";
    }
}

/**
 * Hilfsfunktion, die einen Colorstring aus einer iterationsvariable errechnet um jeden Balken/Slice eines Diagrammes zu färben
 * @param number nummer der Iteration
 * @returns {string} farbe des Balken/Slices für das Diagramm
 */
var getColor = function(number){
    var color='';
    switch(number){
        case 0: color='brown';
            break;
        case 1:color='red';
            break;
        case 2:color='orange';
            break;
        case 3:color='yellow';
            break;
        case 4:color='green';
            break;
        default:color='black';

            break;
    }
    return color;
}