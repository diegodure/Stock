<?php

	include("../conect.php");

	$sql = "select productos.idProductos, productos.Nombre, productos.Descripcion, productos.PrecioUnitario,productos.PrecioMayorista,productos.PrecioPromocional,productos.CantidadActual,productos.CantidadMinima, productos.Imagen, productos.Vencimiento, productos.Costo from productos where productos.active='0'";


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