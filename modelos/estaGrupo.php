<?php
	include('../modelos/conexion.php');

	$nombre = $_POST['nomg'];
	$idOri = $_POST['idus'];
	$cursor = $dbh->query("select id from grupo where nombre = '$nombre' and id_ori = $idOri");
	$id =0;
	while($grupo = mysqli_fetch_array($cursor)) {
		$id = $grupo["id"];
	}
	echo $id;


?>