<?php
	include('../modelos/conexion.php');

	   $id = $_POST['idu'];
	   $cursor = $dbh->query("update usuario set rol='ninguno' where id=$id");
		if($cursor != null){
			echo "1";
		}else{
			echo "0";
		}


?>