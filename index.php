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