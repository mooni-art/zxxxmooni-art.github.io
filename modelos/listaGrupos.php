<?php
	include('../modelos/grupo.php');
	$listaGrupos = listaGrupos();
	$tam = count($listaGrupos);
	$opciones = "";
	if($listaGrupos == 0){
		$opciones = "0";
	}else{
		for($x = 0; $x < $tam; $x++) {
			$y = $x + 1;
       		$opciones = $opciones . "<option value=$listaGrupos[$x]> $listaGrupos[$y]</option>";
       		$x = $y;
		}
	}
	
	echo $opciones;
?>