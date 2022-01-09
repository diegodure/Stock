<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	$total = $data->{"total"};
	//echo($id);

	include("../conect.php");

    $sql = "insert into Ventas (idVentas, Fecha, Total, Cliente_idCliente) values (null, CURDATE(), '$total', '$id')";

    $con->query($sql);

    $con->close();

?>