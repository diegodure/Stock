<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$info = $data->{"info"};
	$sucursal = $data->{"sucursal"};

	include("../conect.php");

	$sql = "insert into proveedores (idProveedores, Nombre, Apellido, Informacion, Sucursal_idSucursal, active) values (null, '$nombre', '$apellido', '$info', '$sucursal', 0)";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Proveedor creado correctamente!";
    }

	$con->close();
?>