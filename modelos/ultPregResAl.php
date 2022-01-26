<?php
	include('conexion.php');
		$id = $_POST['idAl'];
		$cursor = $dbh->query("select ultres from alumno where id = $id");
		$existe =0;
		while($question = mysqli_fetch_array($cursor)) {
				$existe= $question["ultres"];
		}	
		echo $existe;
?> 