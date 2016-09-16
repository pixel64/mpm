<?php
$files = array("eventHandler.js","general.js","init.js","menue.js","messages.js");
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
    <title></title>
</head>
<body>
<div id="menue-button">
    <button class="btn btn-default" id="bu_menue" onclick="toggleMenue();">Open</button>
</div>
<div id="overlay-menue">
    <ul class="list-group">
        <a href="#" onclick="customAlert('Test Fehler!!!',1)"><li class="list-group-item">Sample Error</li></a>
        <a href="#" onclick="customAlert('Test Fehler!!!')"><li class="list-group-item">Sample Notification</li></a>
        <li class="list-group-item">Menüpunkt 3</li>
    </ul>
</div>
<div id="dropzone" style="width:100%; height:100%; background-color: black;">

</div>
<div id="message"></div>
</body>
</html>

<script src="general.js"></script>
<script>
    InitDragAndDrop();
    initMenue();
</script>