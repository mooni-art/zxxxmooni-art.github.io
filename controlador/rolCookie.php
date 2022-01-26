<?php
	session_start();
	if(isset($_SESSION['rolusuario'])){
		echo($_SESSION['rolusuario']);
	}else{
		echo("ERROR");
	}

?>