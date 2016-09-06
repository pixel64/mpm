<?php
$files = array("eventHandler.js","general.js","init.js");
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
    <title>$Title$</title>
</head>
<body>
  <div id="dropzone" style="width:300px; height:300px; background-color: black;">

  </div>
</body>
</html>

<script type="text/javascript" src="lib/general.js"></script>
<script type="text/javascript" src="lib/eventHandler.js"></script>
<script type="text/javascript" src="lib/init.js"></script>
<script>
InitDragAndDrop();
</script>