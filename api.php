<?php

$host = "127.0.0.1";
$dbname = "upvoterdb";
$user = "danielbodine";
$pass = "Special2";

$DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass)  or die("Failed to open DB");

$function =  htmlspecialchars($_GET["function"]);
$choice =  htmlspecialchars($_GET["choice"]);

if ($function == "up"){
	$choice = $DBH->quote($choice);
	$update = "UPDATE votes SET upvotes = upvotes + 1 WHERE choice = " .$choice. ";";
	echo $update;
	$statement = $DBH->prepare($update);
	$statement->execute();	
}

if ($function == "down"){
	$choice = $DBH->quote($choice);
	$update = "UPDATE votes SET upvotes = upvotes - 1 WHERE choice = " .$choice. ";";
	echo $update;
	$statement = $DBH->prepare($update);
	$statement->execute();	
}

if ($function == "insert"){
	$choice = $DBH->quote($choice);
	$insert = "INSERT INTO votes (choice, upvotes) VALUES (" . $choice .", 0 );";
	echo $insert;
	$statement = $DBH->prepare($insert);
	$statement->execute();	
}

$query = "SELECT * FROM votes ORDER BY upvotes DESC";
$statement = $DBH->prepare($query);
$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);

$DBH = null;
?>