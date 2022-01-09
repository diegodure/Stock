<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$info = $data->{"info"};

	include("../conect.php");

	$sql = "insert into Clientes (idCliente, Nombre, Apellido, Info) values (null, '$nombre', '$apellido', '$info')";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Cliente creado correctamente!";
    }

	$con->close();
?>