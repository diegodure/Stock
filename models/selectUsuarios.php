<?php
	
	include("../conect.php");

	$sql = "select usuarios.idUser, usuarios.nombre, usuarios.apellido, usuarios.User, usuarios.Pass, roles.Nombre as Rol, roles.idRoles as rolId from usuarios inner join roles on usuarios.Roles_idRoles=roles.idRoles where usuarios.active='0'";


	$results = $con->query($sql);


	$rawdata = array();

	$i = 0;
	if (!$results) {
   		echo "error";
	}else{
		while ($row = mysqli_fetch_array($results)) {
		$rawdata[$i] = $row;
		$i++;

		}
		$myArray = $rawdata;
		echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
	}
	$con->close();

?>