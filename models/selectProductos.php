<?php

	include("../conect.php");

	$sql = "select Productos.idProductos, Productos.Nombre, Productos.Descripcion, Productos.PrecioUnitario,
	Productos.PrecioMayorista, Productos.PrecioPromocional,Productos.CantidadActual,Productos.CantidadMinima, Proveedores.Nombre as provN, Proveedores.idProveedores as provId, Proveedores.idProveedores from Productos inner join Proveedores on Productos.Proveedores_idProveedores=Proveedores.idProveedores";


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