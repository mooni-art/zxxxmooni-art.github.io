<?php
	include('conexion.php');
		$ida = $_POST['idAl'];
		$idp = $_POST['idP'];
		$res = $_POST['res'];
		$cursor = $dbh->query("insert into respuestas values ($idp,$ida,$res)");
		$idp = $idp + 1;
		$cursor = $dbh->query("update alumno set ultres = $idp where id=$ida");
		if($cursor != null){
			echo "1";
		}else{
			echo "0";
		}
?>