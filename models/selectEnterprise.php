<?php

	include("../conect.php");

	$sql = "select * from empresas";


	$results = $con->query($sql);


	$rawdata = array();

	$i = 0;

	while ($row = mysqli_fetch_array($results)) {
		$rawdata[$i] = $row;
		$i++;

	}

	$con->close();

	$myArray = $rawdata;
	echo json_encode($myArray, JSON_UNESCAPED_UNICODE);


?>