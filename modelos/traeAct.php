<?php
	include("conexion.php");
	include("alumnito.php");
	include("usuario.php");
	$cursor = $dbh->query("select * from bitacora where visto != 1");
		$i =0;
		while($grupos = mysqli_fetch_array($cursor)) {;
			echo $grupos["actividad"];
			echo "|";
			if($grupos["rol"] == "alumno"){
				echo nombreAlumno($grupos["quien"])." ".apAlumno($grupos["quien"])." ".amAlumno($grupos["quien"]);
			}else{
				echo nombreUsuario($grupos["quien"]);
			}
			echo "|";
			echo $grupos["rol"];
			echo "|";
			echo $grupos["cuando"];
			echo "|";
			echo $grupos["hora"];
			echo "|";
			echo $grupos["ipusuario"];
			echo "|";
			$i++;
		}
		if($i == 0){
			echo 0;
		}else{
			$cursor = $dbh->query("update bitacora set visto = 1");
		}
?>