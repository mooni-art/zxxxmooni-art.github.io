<?php
	include("conexion.php");
	$usuarioLogeado = $_POST['ul'];
	$cursor = $dbh->query("select id,user from usuario where id != $usuarioLogeado and rol != 'ninguno'");
		$i =0;
		while($grupos = mysqli_fetch_array($cursor)) {
			echo $grupos["id"];
			echo "|";
			echo $grupos["user"];
			echo "|";
		}
		if($i == 0){
			echo 0;
		}

?>