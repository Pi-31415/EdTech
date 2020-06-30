<?php
$myfile = fopen("customer.txt", "r") or die("Unable to open file!");

$original_content =  fread($myfile,filesize("customer.txt"));

$myfile = fopen("customer.txt", "w") or die("Unable to open file!");

$date = date("Y/m/d");

$customer = $_GET['customer'];
$name = $_GET['name'];
$email = $_GET['email'];
$phone = $_GET['phone'];
$school = $_GET['school'];
$howhelp = $_GET['howhelp'];

$new_content .= "-----------------";




$new_content .= "-----------------";

$txt = $original_content.$new_content;


fwrite($myfile, $txt);

fclose($myfile);
?>