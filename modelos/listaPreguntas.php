<?php
	include('../modelos/conexion.php');
	$cursor = $dbh->query("select * from test");
	$i = 0;
	while($areas = mysqli_fetch_array($cursor)) {
		$listaAreas[$i] = $areas["id"];
		$i++;
		$listaAreas[$i] = $areas["num_preg"];
		$i++;
		$listaAreas[$i] = $areas["pregunta"];
		$i++;
	}
	echo json_encode($listaAreas);
	


?>