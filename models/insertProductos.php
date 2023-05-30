<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$descripcion = $data->{"descripcion"};
	if(!empty($data->{"cantidad"})){
		$cantidad = $data->{"cantidad"};
	}else{
		$cantidad = 0;
	}
	if(!empty($data->{"cantidadMin"})){
		$cantidadMin = $data->{"cantidadMin"};
	}else{
		$cantidadMin = 0;
	}
	if(!empty($data->{"precioPromocional"})){
		$precioPromocional = $data->{"precioPromocional"};
	}else{
		$precioPromocional = 0;
	}
	$precioUnitario = $data->{"precioUnitario"};
	$precioMayorista = $data->{"precioMayorista"};
	$costo = $data->{"costoProducto"};
	include("../conect.php");
	if (!empty($data->{"fechaVencimiento"})) {
		$fechaVencimiento = $data->{"fechaVencimiento"};
		$sql = "insert into productos (idProductos, Nombre, Descripcion, CantidadActual, CantidadMinima, PrecioUnitario, PrecioMayorista, PrecioPromocional, active, Vencimiento, Imagen, CodigoBarra, Costo) values (null, '$nombre', '$descripcion','$cantidad', '$cantidadMin', '$precioUnitario', '$precioMayorista', $precioPromocional, 0, '$fechaVencimiento', null, '0',$costo)";
	}else{
		$sql = "insert into productos (idProductos, Nombre, Descripcion, CantidadActual, CantidadMinima, PrecioUnitario, PrecioMayorista, PrecioPromocional, active, Vencimiento, Imagen, CodigoBarra, Costo) values (null, '$nombre', '$descripcion','$cantidad', '$cantidadMin', '$precioUnitario', '$precioMayorista', $precioPromocional, 0, null, null, '0',$costo)";
	}
	
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Producto creado correctamente!";
    }

	$con->close();
?>