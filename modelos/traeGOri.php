<?php
	include('../modelos/conexion.php');
	$cursor = $dbh->query("select * from grupo");
		$i =0;
		while($grupos = mysqli_fetch_array($cursor)) {
			$listaGrupos[$i] = $grupos["id"];
			$i++;
			$listaGrupos[$i] = $grupos["nombre"];
			$i++;
		}
		if($i != 0){
			echo $listaGrupos;
		}else{
			echo 0;
		}
?>