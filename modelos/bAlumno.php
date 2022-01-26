<?php

	include('conexion.php');
		$nombre = $_POST['nombre'];
		$ap = $_POST['ap'];
		$am = $_POST['am'];
		$sexo = $_POST['sexo'];
		$cursor = $dbh->query("select * from alumno where alumno.nombre = '$nombre' and a_p='$ap' and a_m='$am' and sexo = '$sexo'");
		$existe[0] =0;
		if($cursor != ""){
			while($question = mysqli_fetch_array($cursor)) {
				$existe[0]= $question["id"];
				$existe[1]=	$question["nombre"];
				$existe[2]=	$question["a_p"];
				$existe[3]=	$question["a_m"];
				$existe[4]=	$question["sexo"];
				$existe[5]=	$question["ultres"];
				$existe[6]=	$question["periodo"];
				$existe[7]=	$question["carrera_interes"];
				$existe[8]=	$question["clave"];
			}
		}
		
		echo json_encode($existe);

?>