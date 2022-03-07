<?php
	$data = json_decode(file_get_contents("php://input"));
	$name = $data->{"name"};
	$description = $data->{"description"};
	$city = $data->{"city"};
	$neighborhood = $data->{"neighborhood"};
	$address = $data->{"address"};
	$phone = $data->{"phone"};
	$country = $data->{"country"};
	if($description == undefined){
		$description = null;
	}
	if($phone == undefined){
		$phone = null;
	}
	include("../conect.php");

	$sql = "insert into empresas (idEmpresas, Nombre, Descripcion, Ciudad, Barrio, Dirreccion, Telefono, Paises_IdPais, active) values (null, '$name', '$description', '$city', '$neighborhood', '$address', '$phone', '$country', 0)";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Empresa creada correctamente!";
    }

	$con->close();
?>