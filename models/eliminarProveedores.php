<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	
	include("../conect.php");

	$sql = "delete from Proveedores where idProveedores='$id'";
	$results =$con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Proveedor eliminado correctamente!";
    }

	$con->close();
?>