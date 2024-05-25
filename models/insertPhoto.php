<?php
	include("../conect.php");
	$sql = "select max(idProductos) as idP from productos";
	$result = $con->query($sql);

  	if($row = mysqli_fetch_row($result)){
  		$idP = trim($row[0]);
	}

	// Recibir la información del archivo
    $archivo = $_FILES['file'];
    $rutaTemporal = $archivo["tmp_name"];
	
	// Procesar la imagen
    $datos = compressAndEncodeImage($rutaTemporal, 1024); // Tamaño máximo de 1MB
    
    // Actualizar la base de datos con la imagen comprimida
    $sql = "UPDATE productos SET Imagen='$datos' WHERE idProductos='$idP'";
    $results = $con->query($sql);
    
 	if(!$results){ 
		echo "error";
	}
	else{
		echo "Producto modificado correctamente!";
	}
	$con->close();

	// Función para comprimir y codificar la imagen
	function compressAndEncodeImage($source, $max_size_kb) {
	    $info = getimagesize($source);
	    if ($info['mime'] == 'image/jpeg') 
	        $image = imagecreatefromjpeg($source);
	    elseif ($info['mime'] == 'image/png') 
	        $image = imagecreatefrompng($source);
	    elseif ($info['mime'] == 'image/gif') 
	        $image = imagecreatefromgif($source);
	    else 
	        return false;

	    $quality = 75; // Calidad inicial de compresión
	    $target_size_bytes = $max_size_kb * 1024; // Tamaño máximo en bytes

	    do {
	        ob_start();
	        imagejpeg($image, null, $quality);
	        $compressed_image = ob_get_clean();
	        $size = strlen($compressed_image);
	        $quality -= 5;
	    } while ($size > $target_size_bytes && $quality > 0);

	    imagedestroy($image);
	    
	    return base64_encode($compressed_image);
	}
?>