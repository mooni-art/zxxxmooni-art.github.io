<?php
	include('conexion.php');
	$idal = $_POST['ida'];
	$cursor = $dbh->query("select * from respuestas where id_al = $idal");
	$i = 0;
	$listaAreas = [];
	if($cursor != null){
		while($areas = mysqli_fetch_array($cursor)) {
			$listaAreas[$i] = $areas["id_test"];
			$i++;
			$listaAreas[$i] = $areas["id_al"];
			$i++;
			$listaAreas[$i] = $areas["respuesta"];
			$i++;
		}
	}
	echo json_encode($listaAreas);	
?>