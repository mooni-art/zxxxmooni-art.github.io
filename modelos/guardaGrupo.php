<?php
	include('../modelos/conexion.php');

	$nombre = $_POST['nomg'];
	$idOri = $_POST['idOri'];
	$cursor = $dbh->query("insert into grupo (nombre,id_ori) values ('$nombre',$idOri)");
		if($cursor != null){
			echo "1";
		}else{
			echo "0";
		}


?>