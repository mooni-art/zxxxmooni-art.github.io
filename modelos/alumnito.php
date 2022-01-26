<?php
	function nombreAlumno($id){
		include "conexion.php";
		$cursor = $dbh->query("select nombre from alumno where id = $id");
		$contador ="";
		$usuario = mysqli_fetch_array($cursor);
		if ($usuario <> "") {
			$contador = $usuario["nombre"];
		}
		mysqli_close($dbh);
		return $contador;
	}
	function apAlumno($id){
		include "conexion.php";
		$cursor = $dbh->query("select a_p from alumno where id = $id");
		$contador ="";
		$usuario = mysqli_fetch_array($cursor);
		if ($usuario <> "") {
			$contador = $usuario["a_p"];
		}
		mysqli_close($dbh);
		return $contador;
	}
	function amAlumno($id){
		include "conexion.php";
		$cursor = $dbh->query("select a_m from alumno where id = $id");
		$contador ="";
		$usuario = mysqli_fetch_array($cursor);
		if ($usuario <> "") {
			$contador = $usuario["a_m"];
		}
		mysqli_close($dbh);
		return $contador;
	}
?>