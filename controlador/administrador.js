$(document).ready(function(){
	var log = estaLogeado();
	if(log == "ERROR"){
		alert("Debes iniciar Sesion primero");
		location.href = "index.html"
	}else{
		if(rolUsuarioCookie() != "admin"){
			location.href = "orientador.html";
		}else{
			$("#user").val(log);
			document.getElementById("usuario").innerHTML = "Administrador(@): "+log;
		}
		
	}



	$("#btnBU").click(function(){
			var idu = $("#listau").val();
			if(bajausuario(idu)==1){
				alert("Usuario eliminado exitosamente");
				location.href = "admin.html"
			}else{
				alert("No se pudo eliminar usuario");
			}
	});


	




	function bajausuario(idu){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"idu": idu},
            url: '../modelos/bajaUsuario.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}
	function estaLogeado(){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"cooki": "usuario"},
            url: '../controlador/iniciaSesion.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}
	function rolUsuarioCookie(){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"cooki": "usuario"},
            url: '../controlador/rolCookie.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}
	
	function validaNombre(nombre,pss,pss1){
		if(nombre.length > 10 || nombre.length < 4){
			alert("El nombre es invalido\nEl nombre de usuario debe tener entre 4 y 10 caracteres");
			return false;
		}
		if(pss.length > 15 || pss.length < 6){
			alert("La contraseña debe tener al menos 6 caracteres (Maximo 15)");
			return false;
		}
		if(pss1.length == 0){
			alert("Debes llenar todos los campos");
			return false;
		}
		if(pss != pss1){
			alert("Las contraseñas no coinciden");
			return false;
		}
		return true;
	}
	function guardaUsuario(nombre,pss,rol){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"nombreUser": nombre, "passw": pss, "rol": rol},
            url: '../modelos/guardaUsuario.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}

	function estaUsuario(nombre){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"nombreUser": nombre},
            url: '../modelos/estaUsuario.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}

});