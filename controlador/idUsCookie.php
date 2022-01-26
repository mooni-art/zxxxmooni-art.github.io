<?php
	session_start();
	if(isset($_SESSION['idusuario'])){
		echo($_SESSION['idusuario']);
	}else{ 
		echo("ERROR");
	}

?>