<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
	$con = new mysqli("localhost","root","root","stock");
	// if($con>0){
	// 	echo "conexion ok";
	// }else{
	// 	echo "no conexion ";
	// }
	mysqli_set_charset($con, "utf8");
?>