<?php
	include("conexion.php");
		$idg = $_POST["idg"];
		$idarea = $_POST["idarea"];
		$periodo = date("Y");
		$cursor = $dbh->query("select percentil from evaluacion where id_al=$idg and id_area = $idarea");
		$i =0;
		while($grupos = mysqli_fetch_array($cursor)) {
			echo $grupos["percentil"];
			echo "|";
			$i++;
		}
		$cursor = $dbh->query("select nombre,a_p,a_m from alumno where id=$idg");
		$nameal = "";
		$apal ="";
		$amal = "";
		while($grupos = mysqli_fetch_array($cursor)) {
			$nameal = $grupos["nombre"];
			$apal = $grupos["a_p"]; 
			$amal =  $grupos["a_m"];
			echo $grupos["nombre"];
			echo "|";
			echo $grupos["a_p"];
			echo "|";
			echo $grupos["a_m"];
			echo "|";
			$i++;
		} 
		if($i == 0){
			echo 0;
		}else{
		}
?>