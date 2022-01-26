<?php
	include('../modelos/grupo.php');
	$idOri = $_POST['idori'];
	$listaGrupos = listaGruposOri($idOri);
	echo json_encode($listaGrupos);
?>