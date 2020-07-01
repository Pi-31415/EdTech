<?php
$myfile = fopen("customer.txt", "r") or die("Unable to open file!");

$original_content =  fread($myfile,filesize("customer.txt"));

$myfile = fopen("customer.txt", "w") or die("Unable to open file!");

$date = date("Y/m/d");
$new_content = "";
$customer = $_GET['customer'];
$name = htmlspecialchars($_GET['name']) ?? 'No name provided';
$email = htmlspecialchars($_GET['email']) ?? 'No email provided';
$phone = htmlspecialchars($_GET['phone']) ?? 'No phone provided';
$school = htmlspecialchars($_GET['school']) ?? 'No school provided';
$howhelp = htmlspecialchars($_GET['howhelp']) ?? 'No comment provided';

$new_content .= "-----------------\n";
$new_content .= $date."\n";
$new_content .= "Type:".$customer."\n";
$new_content .= "Name : ".$name."\n";
$new_content .= "Email : ".$email."\n";
$new_content .= "Phone : ".$phone."\n";
$new_content .= "School : ".$school."\n";
$new_content .= "How can we help: ".$howhelp."\n\n";

$txt = $original_content.$new_content;


fwrite($myfile, $txt);

fclose($myfile);
?>