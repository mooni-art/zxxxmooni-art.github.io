<?php
	include('../modelos/conexion.php');
	$cursor = $dbh->query("select * from area");
	$i = 0;
	while($areas = mysqli_fetch_array($cursor)) {
		$listaAreas[$i] = $areas["id"];
		$i++;
		$listaAreas[$i] = $areas["nom_a"];
		$i++;
	}
	echo json_encode($listaAreas);
	


?>