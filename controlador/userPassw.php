<?php
	
		include("../modelos/conexion.php");
		include("../modelos/usuario.php");

		$usuario = $_POST['user'];
		$contrasenia = $_POST['contraseña'];
		$entro = estaUsuario($usuario,$contrasenia);
		 if($entro==0){
			 echo "false"; 
		 }else{
		 	echo "true";
		 }
?>