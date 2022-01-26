<?php
	include("../modelos/conexion.php");
	include("../modelos/actividad.php");
	session_start();
	actividad($_SESSION['idusuario'],$_SESSION['rolusuario'],"Cerró sesión");
	unset($_SESSION['usuario']);
	if(isset($_SESSION['usuario'])){
		echo("false");
	}else{
		echo("true");
	}

?>