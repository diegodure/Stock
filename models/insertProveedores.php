<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$info = $data->{"info"};
	$empresa = $data->{"enterprise"};

	include("../conect.php");

	$sql = "insert into proveedores (idProveedores, Nombre, Apellido, Informacion, active, Empresa) values (null, '$nombre', '$apellido', '$info', 0, '$empresa')";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Proveedor creado correctamente!";
    }

	$con->close();
?>