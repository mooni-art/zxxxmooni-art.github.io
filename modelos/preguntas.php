<?php

	include('conexion.php');
		$idP = $_POST['idp'];
		$cursor = $dbh->query("select pregunta from test where num_preg=$idP");
		$i =0;
		while($question = mysqli_fetch_array($cursor)) {
			$pregunta= $question["pregunta"];
		}
		echo $pregunta;

?>