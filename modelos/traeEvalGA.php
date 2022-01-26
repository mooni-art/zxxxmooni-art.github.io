<?php
	include("conexion.php");
		$tipo = $_POST["tipo"];
		$id = $_POST["id"];
		$periodo = date("Y");
		if($tipo == "g"){//POR grupo
			$cursor = $dbh->query("select * from evaluacion,alumno,g_alu where alumno.id = g_alu.id_al and evaluacion.id_al = alumno.id and g_alu.id_g = $id");
		}else{//Quiero los que quedan en esa area
			$condicion = "";
			switch($id){
				case 'fm':
					$condicion = "id_area = 1 or id_area = 2 or id_area = 3 or id_area = 4";
					break;
				case 'qb':
					$condicion = "id_area = 5 or id_area = 6 or id_area = 7";
					break;
				case 'ea':
					$condicion = "id_area = 9 or id_area = 10";
					break;
				case 'h':
					$condicion = "id_area = 8 or id_area = 11 or id_area = 12";
					break;
			}
			$cursor = $dbh->query("select *, sum(percentil) as pe from evaluacion where ".$condicion." group by id_al order by percentil desc");
		}
		$i =0;
		if($cursor != null){
			while($grupos = mysqli_fetch_array($cursor)) {
				echo $grupos["id_al"];
				echo "|";
				echo $grupos["id_area"];
				echo "|";
				echo $grupos["puntaje"];
				echo "|";
				if($tipo == "a"){
					echo $grupos["pe"];
				}else{
					echo $grupos["percentil"];
				}
				echo "|";
				$i++;
			}
		}
		if($i == 0){
			echo 0;
		}else{
		}
?>