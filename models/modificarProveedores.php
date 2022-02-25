<?php
	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$info = $data->{"info"};
	$idSucursal = $data->{"idSucursal"};
	$id = $data->{"id"};
	
	include("../conect.php");

	$sql = "update proveedores set Nombre='$nombre', Apellido='$apellido',Informacion='$info',Sucursal_idSucursal='$idSucursal' where idProveedores='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Proveedor modificado correctamente!";
    }

	$con->close();
?>