<?php
	function listaAreas(){
		include('../modelos/conexion.php');
	   $cursor = $dbh->query("select id from area");
				$i = 0;
				while($areas = mysqli_fetch_array($cursor)) {
					$listaAreas[$i] = $areas["id"];
					$i++;
				}
				return $listaAreas;
	}


?>