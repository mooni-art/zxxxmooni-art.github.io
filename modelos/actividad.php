<?php

	function actividad($quien,$rol,$actividad){
		date_default_timezone_set('America/Monterrey');
		$hora = date('H:i:s');
		$fecha = date('Y-m-d');
		$ip = $_SERVER['REMOTE_ADDR'];
		$cursor = $dbh->query("insert into bitacora (actividad,quien,cuando,hora,rol,ipusuario,visto) values ('$actividad',$quien,'$fecha','$hora','$rol','$ip',0)"); 
	}

?>