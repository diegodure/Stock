<?php

    $data = json_decode(file_get_contents("php://input"));
    $idVenta = $data->{"idVenta"};
    $fecha = $data->{"fecha"};
    include("../conect.php");

    $sql ="select Det_Compras.Compras_idCompras, Productos.Nombre, Det_Compras.Precio, Det_Compras.Cantidad from Det_Compras inner join Productos on Det_Compras.Productos_idProductos=Productos.idProductos where Compras_idCompras = '$idVenta'";

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