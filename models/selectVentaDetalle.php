<?php

    $data = json_decode(file_get_contents("php://input"));
    $idVenta = $data->{"idVenta"};
    $fecha = $data->{"fecha"};
    include("../conect.php");

    $sql ="select Det_Ventas.Ventas_idVentas, Productos.Nombre, Det_Ventas.Precio, Det_Ventas.Cantidad from Det_Ventas inner join Productos on Det_Ventas.Productos_idProductos=Productos.idProductos where Ventas_idVentas = '$idVenta'";

    $results = $con->query($sql);

    $rawdata = array();

    $i = 0;

    while($row = mysqli_fetch_array($results)){
        $rawdata[$i] = $row;
        $i++;

    }

    $con->close();

    $myArray = $rawdata;
    echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
?>