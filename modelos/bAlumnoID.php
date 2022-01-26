<?php

	include('conexion.php');
		$id = $_POST['id'];
		$cursor = $dbh->query("select * from alumno where alumno.id = $id");
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