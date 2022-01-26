<?php

	include('conexion.php');
		$ida = $_POST['ida'];
		$cursor = $dbh->query("select id_ev from evaluacion where id_al = $ida");
		$existe =0;
			while($question = mysqli_fetch_array($cursor)) {
				$existe++;
			}
		echo $existe;
?>