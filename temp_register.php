<?php
$myfile = fopen("customer.txt", "w") or die("Unable to open file!");

$original_content =  fread($myfile,filesize("customer.txt"));

$txt = $original_content."John Doe\n";
fwrite($myfile, $txt);

fclose($myfile);
?>