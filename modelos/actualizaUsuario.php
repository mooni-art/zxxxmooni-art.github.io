<?php
	include('../modelos/conexion.php');
	include('../modelos/usuario.php');
	$nombre = $_POST['nombreUser'];
	$pass = $_POST['passw'];
	$idu = $_POST['idu'];
	session_start();
		$cursor = $dbh->query("update usuario set user = '$nombre', pss = MD5('$pass') where id = $idu");
		if($cursor != null){
			echo "1";
		}else{
			echo "0";
		}


?>