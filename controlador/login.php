<?php
	
		
		include("../modelos/usuario.php");
		$usuario = $_POST['user'];
		$contrasenia = $_POST['contraseña'];
		$entro = estaUsuario($usuario,$contrasenia);
		 if($entro==0){
			 //no son correctas las credenciales
			 echo "false";
		 }else{
		 	session_start();
		 	$_SESSION['usuario'] = $usuario;
			 $rol = tipoUsuario($usuario);
			 $_SESSION['rolusuario'] = $rol;
			 $_SESSION['idusuario'] = $entro;
			 if($rol == "admin"){
			 	echo "admin";
			 }else{
			 	if($rol == "orientador"){
			 		echo "ori";
			 	}else{
			 	
			 	}
			 }
		 }
?>