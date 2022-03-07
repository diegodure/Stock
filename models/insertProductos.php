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
	$proveedor = $data->{"proveedor"};
	if (!empty($data->{"fechaVencimiento"})) {
		$fechaVencimiento = $data->{"fechaVencimiento"};
	}else{
		$fechaVencimiento = 0;
	}
	
// 	 $sql = "select max(idHistorial) as idH from Historial";
//  $result = $con->query($sql);

//  if($row = mysqli_fetch_row($result)){
//  	$idH = trim($row[0]);
//  }

// foreach ($_FILES as $archivo) {
// 	$nombre = $_FILES['file']["name"];
//     $datos = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
//     $sql = "update Historial set Imagen='$datos' where idHistorial='$idH'";
//     $con->query($sql);
// }
// 	if($con -> connect_errno){
//         die("Error de conexión: " . $con->mysqli_connect_errno() . ", " . $con->mysqli_connect_error());
//     }else{
//     	echo "Consulta registrada correctamente";
//     }
// 	$con->close();
	include("../conect.php");

	$sql = "insert into productos (idProductos, Nombre, Descripcion, CantidadActual, CantidadMinima, PrecioUnitario, PrecioMayorista, PrecioPromocional, Proveedores_idProveedores, active, Vencimiento, Imagen) values (null, '$nombre', '$descripcion',$cantidad, $cantidadMin, '$precioUnitario', $precioMayorista, $precioPromocional, '$proveedor', 0, $fechaVencimiento, $datos)";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Producto creado correctamente!";
    }

	$con->close();
?>