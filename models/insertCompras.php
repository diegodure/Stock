<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	$total = $data->{"total"};
	//echo($id);

	include("../conect.php");

    $sql = "insert into compras (idCompras, Fecha, Total, Proveedores_idProveedores, active) values (null, CURDATE(), '$total', '$id', 0)";

    $con->query($sql);

    $con->close();

?>