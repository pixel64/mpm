<?php
$files = array("init.js","locate.js","eventHandler.js","general.js","menue.js","messages.js","tom.js","worker.js","open_streetmap.js","filter.js");
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
<body onload="locate();">
<div id="menue-button">
    <button class="btn btn-default" id="bu_menue" onclick="toggleMenue();">Menü</button>
</div>
<div id="overlay-menue">
    <ul class="list-group">
        <li class="list-group-item">
            <form>
            <p>Auswahl der Anzeige auf der Karte</p>
            <input type="radio" id="radio1" name="circletype" value="bandwith" checked="checked" onchange="onclick = setDisplayType(true);">
            <label for="radio1">Bandbreite</label><br>
            <input type="radio" id="radio2" name="circletype" value="signal" onchange="onclick = setDisplayType(false);">
            <label for="radio2">Signalstärke</label>
        </form>
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
                <option value="all">Alle</option>
                <option value="GPRS">GPRS</option>
                <option value="EDGE">EDGE</option>
                <option value="UMTS">UMSTS</option>
                <option value="HSPA+">HSPA+</option>
                <option value="LTE">LTE</option>
            </select>
        </li>
        <li class="list-group-item">
            <label>Uhrzeit von:</label>
            <select class="form-control" id="select_starttime">
                <option value="0" selected="selected">0:00</option>
                <option value="1">1:00</option>
                <option value="2">2:00</option>
                <option value="3">3:00</option>
                <option value="4">4:00</option>
                <option value="5">5:00</option>
                <option value="6">6:00</option>
                <option value="7">7:00</option>
                <option value="8">8:00</option>
                <option value="9">9:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
            </select>
        </li>
        <li class="list-group-item">
            <label>Uhrzeit bis:</label>
            <select class="form-control" id="select_endtime">
                <option value="0">0:00</option>
                <option value="1">1:00</option>
                <option value="2">2:00</option>
                <option value="3">3:00</option>
                <option value="4">4:00</option>
                <option value="5">5:00</option>
                <option value="6">6:00</option>
                <option value="7">7:00</option>
                <option value="8">8:00</option>
                <option value="9">9:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
                <option selected="selected" value="24">24:00</option>
            </select>
        </li>
        <li class="list-group-item">
            <label id="bandwith_select_value">Minimale Bandbreite: 0</label>
            <input id="select_bandwidth" type="range" min =0 max =10000 step =500 value=0 onchange="updateBandwithNumber(this.value);">
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
<div id="overlay-block">
    <div class="overlay-layer"></div>
    <div class="alert alert-info overlay-message" role="alert">
        <strong>BITTE WARTEN</strong> Es werden daten verarbeitet.
    </div>
</div>
<div id="message"></div>
</body>
</html>

<script src="general.js"></script>
<script>
    InitDragAndDrop();
    initMenue();
</script>
