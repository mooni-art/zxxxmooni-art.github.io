<?php
	include('../modelos/conexion.php');

	$nombre = $_POST['nombreUser'];
	$cursor = $dbh->query("select id from usuario where user='$nombre'");
		$id =0;
		while($grupo = mysqli_fetch_array($cursor)) {
			$id = $grupo["id"];
		}
		echo $id;


?>