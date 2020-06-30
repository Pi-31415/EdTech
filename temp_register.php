<?php
$myfile = fopen("customer.txt", "r") or die("Unable to open file!");

$original_content =  fread($myfile,filesize("customer.txt"));

$myfile = fopen("customer.txt", "w") or die("Unable to open file!");

$date = date("Y/m/d");
$new_content = "";
$customer = $_GET['customer'];
$name = $_GET['name'];
$email = $_GET['email'];
$phone = $_GET['phone'];
$school = $_GET['school'];
$howhelp = $_GET['howhelp'];

$new_content .= "-----------------\n";
$new_content .= $date."\n";
$new_content .= "Type:".$customer."\n";
$new_content .= "Name : ".$name."\n";
$new_content .= "Email : ".$email."\n";
$new_content .= "Phone : ".$phone."\n";
$new_content .= "School : ".$school."\n";
$new_content .= "How can we help: ".$howhelp."\n";
$new_content .= "-----------------\n";

$txt = $original_content.$new_content;


fwrite($myfile, $txt);

fclose($myfile);
?>