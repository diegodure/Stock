<?php
	
	include("../conect.php");

	$sql = "select Usuarios.idUser, Usuarios.nombre, Usuarios.apellido, Usuarios.User, Usuarios.Pass, Roles.Nombre as Rol, Roles.idRoles as rolId, Sucursal.Nombre as Sucursal, Sucursal.idSucursal as idSucursal from Usuarios inner join Roles on Usuarios.Roles_idRoles=Roles.idRoles inner join Sucursal on Usuarios.Sucursal_idSucursal=Sucursal.idSucursal where Usuarios.active='0'";


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