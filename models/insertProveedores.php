<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$info = $data->{"info"};
	$empresa = $data->{"empresa"};

	include("../conect.php");

	$sql = "insert into proveedores (idProveedores, Nombre, Apellido, Informacion, Empresa, active) values (null, '$nombre', '$apellido', '$info', '$empresa', 0)";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Proveedor creado correctamente!";
    }

	$con->close();
?>