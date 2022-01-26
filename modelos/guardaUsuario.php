<?php
	include('../modelos/conexion.php');
	$nombre = $_POST['nombreUser'];
	$pass = hash('md5', $_POST['passw']);
	$rol = $_POST['rol'];
	$cursor = $dbh->query("insert into usuario (user,pss,rol) values ('$nombre','$pass','$rol')");
		if($cursor != null){
			echo "1";
		}else{
			echo "0";
		}


?>