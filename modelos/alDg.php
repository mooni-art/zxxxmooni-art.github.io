
<?php
	include("conexion.php");
		$idg = $_POST["idg"];
		$periodo = date("Y");
		$cursor = $dbh->query("select alumno.id,alumno.nombre,alumno.a_p,alumno.a_m,alumno.clave from alumno,g_alu,grupo where alumno.id = g_alu.id_al and grupo.id = g_alu.id_g and grupo.id = $idg and alumno.periodo='$periodo'");
		$i =0;
		while($grupos = mysqli_fetch_array($cursor)) {
			echo $grupos["id"];
			echo "|";
			echo $grupos["nombre"];
			echo "|";
			echo $grupos["a_p"];
			echo "|";
			echo $grupos["a_m"];
			echo "|";
			echo $grupos["clave"];
			echo "|";
			$i++;
		}
		if($i == 0){
			echo 0;
		}

?>