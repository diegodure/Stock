<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	
	include("../conect.php");

	$sql = "delete from Clientes where idCliente='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Cliente eliminado correctamente!";
    }

	$con->close();
?>