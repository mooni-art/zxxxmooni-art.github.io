<?php
	include('conexion.php');
		$nombre = $_POST['nombre'];
		$ap = $_POST['ap'];
		$am = $_POST['am'];
		$sexo = $_POST['sexo'];
		$grupo = $_POST['grupo'];
		$clave = $_POST['clave'];
		$periodo = date("Y");
		$carrer = $_POST['carrera'];
		$cursor = $dbh->query("insert into alumno (nombre,a_p,a_m,sexo,ultres,periodo,carrera_interes,clave) values ('$nombre','$ap','$am','$sexo',0,'$periodo','$carrer','$clave')");
		$cursor = $dbh->query("select id from alumno where nombre='$nombre' and a_p='$ap' and a_m='$am' and sexo='$sexo'");
		$idAl =0;
		while($question = mysqli_fetch_array($cursor)) {
			$idAl= $question["id"];
		}
		$cursor = $dbh->query("insert into g_alu (id_al,id_g) values($idAl,$grupo)");
		if($cursor != null){
			echo "1";
		}else{
			echo "0";
		}
?>