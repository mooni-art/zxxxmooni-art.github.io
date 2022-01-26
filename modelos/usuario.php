<?php
	function estaUsuario($user,$pss){
		include "conexion.php";
			$pss = hash('md5', $pss);
			$cursor = $dbh->query("select id from usuario where user='$user' and pss='$pss' and rol !='ninguno'");
			$contador =0;
			while($us = mysqli_fetch_array($cursor)) {
					$contador = $us["id"];
			}
			mysqli_close($dbh);
			return $contador;
	}
	function tipoUsuario($user){
		include "conexion.php";
		$cursor = $dbh->query("select rol from usuario where user='$user'");
			$contador ="";
			$usuario = mysqli_fetch_array($cursor);
			if ($usuario <> "") {
				$contador = $usuario["rol"];
			}
			mysqli_close($dbh);
			return $contador;
	}
	function nombreUsuario($id){
		include "conexion.php";
		$cursor = $dbh->query("select user from usuario where id = $id");
		$contador ="";
		$usuario = mysqli_fetch_array($cursor);
		if ($usuario <> "") {
			$contador = $usuario["user"];
		}
		mysqli_close($dbh);
		return $contador;
	}
	function idUser($nombre){
		include "conexion.php";
		$cursor = $dbh->query("select id from usuario where user='$nombre' and rol !='ninguno'");
			$contador =0;
			while($us = mysqli_fetch_array($cursor)) {
					$contador = $us["id"];
			}
			mysqli_close($dbh);
			return $contador;
	}
?>