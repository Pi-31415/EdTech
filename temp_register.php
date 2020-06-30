<?php
$myfile = fopen("customer.txt", "r") or die("Unable to open file!");

$original_content =  fread($myfile,filesize("customer.txt"));

$myfile = fopen("customer.txt", "w") or die("Unable to open file!");

$date = date("Y/m/d");

$name = $_GET['name'];
$email = $_GET['email'];

$("#name").val("");
	$("#email").val("");
		$("#phone").val("");
		$("#school").val("");
		$("#howhelp").val("");

$new_content = "";

$txt = $original_content.$new_content;


fwrite($myfile, $txt);

fclose($myfile);
?>