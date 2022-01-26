<?php

	include('conexion.php');
	include('areas.php');
		$ida = $_POST['ida'];
		$listaAreas = listaAreas();//lista de areas
		foreach ($listaAreas as $idar) {//Para cada area
			$listaQxArea = listaPregXArea($idar); //id de las preguntas de un area determinada
			$contador = 0;
			foreach ($listaQxArea as $question) {
				$respuesta = respuestaAlumno($ida,$question);
				$contador = $contador + $respuesta; //Sumo las respuestas
			}
			$percentil = obtienePercentil($idar,$contador,obtieneSexoAl($ida));
			if($percentil == 0){
				$percentil = percentilMasCercano($idar,$contador,obtieneSexoAl($ida));
			}
			if(guardaEvaluacion($ida,$idar,$contador,$percentil)==0){
				echo "0";
			}
		}
		echo "1";




		function guardaEvaluacion($idal,$area,$puntaje,$percentil){
			include('conexion.php');
			$idev = 3;
			$cursor = $dbh->query("insert into evaluacion (id_al,id_area,puntaje,percentil,id_evaluador) values ($idal,$area,$puntaje,$percentil,$idev)");
			mysqli_close($dbh);
			if($cursor != null){
				return 1;
			}else{
				return 0;
			}
		
		}

		function idEvaluador(){
			include('conexion.php');
			$cursor = $dbh->query("select id_evaluador from administracion");
			$ide = 0;
			while($s = mysqli_fetch_array($cursor)) {
				$ide = $s["id_evaluador"];
			}
			mysqli_close($dbh);
			return $ide;
		}


		function percentilMasCercano($idarea,$puntaje,$sexoAl){
			include('conexion.php');
			$cursor = $dbh->query("select puntaje from puntaje_percentil where id_area=$idarea and sexo='$sexoAl'");
			$c =0;
			$per =array();
			while($p = mysqli_fetch_array($cursor)) {
				$per[$c] = $p["puntaje"];
				$c++;
			}	
			for ($i = 0;$i<count($per);$i++) {
				if($i == count($per)-1){
					$puntaje = $per[$i];
				}else{
					if($per[$i]>$puntaje && $per[$i+1]<$puntaje){
						$puntaje = $per[$i];
						$i = count($per);
					}	
				}
				
			}
			$cursor = $dbh->query("select percentil from puntaje_percentil where id_area=$idarea and puntaje=$puntaje and sexo='$sexoAl'");
			$perc = 0;
			while($p = mysqli_fetch_array($cursor)) {
				$perc = $p["percentil"];
			}
			mysqli_close($dbh);
			return $perc;
		}
		function obtieneSexoAl($ida){
			include('conexion.php');
			$cursor = $dbh->query("select sexo from alumno where id=$ida");
			$i = 0;
			while($s = mysqli_fetch_array($cursor)) {
				$sexo = $s["sexo"];
			}
			mysqli_close($dbh);
			return strtoupper($sexo);
		}
		function obtienePercentil($idarea,$puntaje,$sexoAl){
			include('conexion.php');
			$cursor = $dbh->query("select percentil from puntaje_percentil where id_area=$idarea and puntaje=$puntaje and sexo='$sexoAl' limit 1");
			$per = 0;
			while($p = mysqli_fetch_array($cursor)) {
				$per = $p["percentil"];
			}
			mysqli_close($dbh);
			return $per;
		}
		function respuestaAlumno($idal,$idp){
			include('conexion.php');
			$cursor = $dbh->query("select respuesta from respuestas where id_test=$idp and id_al=$idal");
			$i = 0;
			while($p = mysqli_fetch_array($cursor)) {
				$res = $p["respuesta"];
			}
			mysqli_close($dbh);
			return $res;
		}

		function listaPregXArea($idarea){
			include('conexion.php');
			$cursor = $dbh->query("select id_preg from rel_a_p where id_area=$idarea");
			$i = 0;
			while($p = mysqli_fetch_array($cursor)) {
				$listaPreg[$i] = $p["id_preg"];
				$i++;
			}
			mysqli_close($dbh);
			return $listaPreg;
		}
		
?>