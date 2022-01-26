<?php
	include('../modelos/conexion.php');
	$id = $_POST['ida'];
	$cursor = $dbh->query("select nombre from grupo,g_alu where grupo.id = g_alu.id_g and g_alu.id_al = $id");
	$i = 0;
	$name = "";
	while($areas = mysqli_fetch_array($cursor)) {
		$name = $areas["nombre"];
	}
	echo $name;
	


?>