<?php

	include('conexion.php');
		$id = $_POST['ida'];
		$cursor = $dbh->query("select alumno.carrera_interes from alumno where id=$id");
		$existe =0;
			while($question = mysqli_fetch_array($cursor)) {
				$existe= $question["carrera_interes"];
			}
		
		echo $existe;

?>