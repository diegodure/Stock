<?php

	include("../conect.php");

	$sql = "select proveedores.idProveedores, proveedores.Nombre, proveedores.Apellido, proveedores.Informacion, sucursal.Nombre as Sucursal, sucursal.idSucursal as idSucursal from proveedores inner join sucursal on proveedores.Sucursal_idSucursal=sucursal.idSucursal where proveedores.active='0'";


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