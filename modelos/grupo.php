<?php
	function listaGrupos(){
		include '../modelos/conexion.php';
		$cursor = $dbh->query("select * from grupo");
		$i =0;
		while($grupos = mysqli_fetch_array($cursor)) {
			$listaGrupos[$i] = $grupos["id"];
			$i++;
			$listaGrupos[$i] = $grupos["nombre"];
			$i++;
			$listaGrupos[$i] = $grupos["id_ori"];
			$i++;

		}
		mysqli_close($dbh);
		if($i != 0){
			return $listaGrupos;
		}else{
			return 0;
		}
		
	}
	function listaGruposOri($id_or){
		include '../modelos/conexion.php';
		$cursor = $dbh->query("select * from grupo where id_ori = $id_or");
		$i =0;
		while($grupos = mysqli_fetch_array($cursor)) {
			$listaGrupos[$i] = $grupos["id"];
			$i++;
			$listaGrupos[$i] = $grupos["nombre"];
			$i++;
			$listaGrupos[$i] = $grupos["id_ori"];
			$i++;

		}
		mysqli_close($dbh);
		if($i != 0){
			return $listaGrupos;
		}else{
			return 0;
		}
		
	}


?>