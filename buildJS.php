<?php
/**
 * Created by PhpStorm.
 * User: pixel
 * Date: 03.10.2016
 * Time: 18:48
 */
$files = array("init.js","locate.js","eventHandler.js","general.js","menue.js","messages.js","tom.js","worker.js","open_streetmap.js","filter.js","diagrams.js");
$jsfile = "";
foreach($files as $file){
    if(file_exists("lib/".$file)){
        $jsfile .= file_get_contents("lib/".$file);
    }
}
file_put_contents("general.js",$jsfile);
