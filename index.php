<?php
$files = array("init.js","eventHandler.js","general.js","menue.js","messages.js","tom.js","worker.js","open_streetmap.js","filter.js");
$jsfile = "";
foreach($files as $file){
    if(file_exists("lib/".$file)){
        $jsfile .= file_get_contents("lib/".$file);
    }
}
file_put_contents("general.js",$jsfile);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="http://www.openlayers.org/api/OpenLayers.js"></script>
    <script type="text/javascript" src="http://www.openstreetmap.org/openlayers/OpenStreetMap.js"></script>
    <title></title>
</head>
<body onload="drawmap();">
<div id="menue-button">
    <button class="btn btn-default" id="bu_menue" onclick="toggleMenue();">Menü</button>
</div>
<div id="overlay-menue">
    <ul class="list-group">
        <a href="#" onclick="customAlert('Test Fehler!!!',1)"><li class="list-group-item">Sample Error</li></a>
        <a href="#" onclick="customAlert('Test Fehler!!!')"><li class="list-group-item">Sample Notification</li></a>
        <li class="list-group-item">Menüpunkt 3</li>
    </ul>
</div>
<div id="filter-button">
        <button class="btn btn-default" id="bu_filter" onclick="toggleFilter();">Filter</button>
</div>
<div id="overlay-filter">
    <ul class="list-group">
        <li class="list-group-item">
            <label>Netztyp:</label>
            <select class="form-control" id="select_network">
                <option>Alle</option>
                <option>EDGE</option>
                <option>GPRS</option>
                <option>3G</option>
                <option>HSDPA</option>
            </select>
        </li>
        <li class="list-group-item">
            <label>Uhrzeit von:</label>
            <select class="form-control" id="select_starttime">
                <option>0:00</option>
                <option>1:00</option>
                <option>2:00</option>
                <option>3:00</option>
                <option>4:00</option>
                <option>5:00</option>
                <option>6:00</option>
                <option>7:00</option>
                <option>8:00</option>
                <option>9:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>13:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
                <option>22:00</option>
                <option>23:00</option>
            </select>
        </li>
        <li class="list-group-item">
            <label>Uhrzeit bis:</label>
            <select class="form-control" id="select_endtime">
                <option>1:00</option>
                <option>2:00</option>
                <option>3:00</option>
                <option>4:00</option>
                <option>5:00</option>
                <option>6:00</option>
                <option>7:00</option>
                <option>8:00</option>
                <option>9:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>13:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
                <option>22:00</option>
                <option>23:00</option>
                <option selected="selected">24:00</option>
            </select>
        </li>
        <li class="list-group-item">
            <label id="bandwith_select_value">Minimale Bandbreite: 0</label>
            <input id="select_bandwith" type="range" min =0 max =10000 step =500 value=0 onchange="updateBandwithNumber(this.value);">
        </li>
        <li class="list-group-item">
            <label id="signal_select_value">Minimale Signalstärke: 0</label>
            <input id="select_signal" type="range" min =0 max =20 step =1 value=0 onchange="updateSignalNumber(this.value);">
        </li>
        <li class="list-group-item">
            <button class="btn btn-default" onclick="toggleFilter();performFilter();">Filtern</button>
        </li>
    </ul>
</div>
<div id="map">

</div>
<div id="message"></div>
</body>
</html>

<script src="general.js"></script>
<script>
    InitDragAndDrop();
    initMenue();
</script>