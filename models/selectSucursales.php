<?php

	include("../conect.php");

	$sql = "select Sucursal.idSucursal, Sucursal.Nombre from Sucursal inner join Empresas on Sucursal.Empresas_idEmpresas=Empresas.idEmpresas where Sucursal.active='0'";


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