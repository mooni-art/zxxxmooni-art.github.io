<?php
	$tipoReporte = $_POST['tipoReporte']
	$nombre = "reporte_". $tipoReporte . mt_rand();
     $archivo = fopen("$nombre.txt", "w+b");    // Abrir el archivo, creándolo si no existe
    if( $archivo == false ){

      echo "Error al crear el archivo";
    }else{
    	fwrite($archivo, "Estamos probando\r\n");
        fwrite($archivo, "el uso de archivos ");
        fwrite($archivo, "en PHP");
        fflush($archivo);
		fclose($archivo);   // Cerrar el archivo
        header("Content-type: text/html");
        header("Content-length: ".filesize($archivo));
        readfile($archivo);
    }

    
?>