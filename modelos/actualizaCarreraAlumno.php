<?php

	include('conexion.php');
		$idal = $_POST['idal'];
		$carrer = $_POST['carrera'];
		$cursor = $dbh->query("update alumno set carrera_interes = '$carrer' where id = $idal");
		if($cursor != null){
			echo "1";
		}else{
			echo "0";
		}
?>