

$(document).ready(function(){
	
	$('#btnGD').click(function(){//Actualiza datos orientador
		var nombre = $("#nombreOri").val(); 
		var pss =  $("#passwordOri").val();
		var pss1 = $("#passwordOriNew").val();
		var pss2 = $("#passwordOriNew1").val();
		var rol = $("#rol").val();
		if(validaDatos(nombre,pss,pss1,pss2)){
			//Checar la contraseña del usuario primero
			if(checaPassword(nombre,pss) == "true"){
				var nameAct = estaLogeado();
				if(estaUsuario(nombre) != 0 && nombre != nameAct){
					//ya esta registrado
					alert("¡Este usuario ya está registrado!\nNo se guardó");
				}else{
					//no esta registrado
					alert(actualizaUsuario(nombre,pss1,$('#user').val()));
					var ok = actualizaUsuario(nombre,pss1,$('#user').val());
					if(ok == 1){
						alert("Usuario actualizado exitosamente");
						$("#passwordOri").val("");
						$("#passwordOriNew").val("");
						$("#passwordOriNew1").val("");
					}else{
						alert("No se pudo actualizar usuario");
					}
				}
			}else{
				alert("La contraseña actual no coincide");
			}
		}
	});
	$('#btnGG').click(function(){//Guarda grupo
		if(numerico($("#nomg").val())){
			var ng =$("#nomg").val();
			if(estaGrupo(ng) != 0){
				//ya esta registrado
				alert("¡Este grupo ya está registrado!\nNo se guardó");
			}else{
				//no esta registrado
				var ok = guardaGrupo(ng);
				if(ok == 1){
					alert("Grupo guardado exitosamente");
					$("#nomg").val("");
				}else{
					alert("No se pudo guardar el grupo");
				}
			}
			//checar si ese grupo no ha sido registrado
				//si no esta registrado se guarda y se notifica
				//si ya esta registrado se notifica el error
		}else{
			alert("Nombre de grupo invalido\nEl tamaño del nombre debe ser de 3 digitos\nLos nombres de grupo son númericos (ej. 501)")
		}
	});

	function validaDatos(nombre,pssact,pss,pss1){
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
	function checaPassword(nombre,pss){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"user": nombre, "contraseña": pss},
            url: '../controlador/userPassw.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}
	function actualizaUsuario(nombre,pss,id){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"nombreUser": nombre, "passw": pss, "idu": id},
            url: '../modelos/actualizaUsuario.php',
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
	
	function guardaGrupo(nombre){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"nomg": nombre},
            url: '../modelos/guardaGrupo.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}

	function estaGrupo(nombre){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"nomg": nombre},
            url: '../modelos/estaGrupo.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}

	function numerico(texto){
		if(texto==""){
			return false;
		}
		if(texto.length!=3){
			return false;
		}
		for(var  i=0;i < texto.length;i++){
			if(isNaN(texto[i])){
				return false;
			}
		}
		return true;
	}
});