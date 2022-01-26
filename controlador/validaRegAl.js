

$(document).ready(function(){
	$("#guardarRespuesta").click(function(){
		//obtener id de alumno
		var ida = $("#idalumno").val();
		//obtener id de pregunta
		var idp = ultimaPreguntaRespondida(ida);
		//obtener respuesta del alumno
		var res = $('input[name="respuesta"]:checked').val();
		registraRespuesta(ida,idp,res); //registrar respuesta
		//checar si ya acabo las preguntas
		var ures = ultimaPreguntaRespondida(ida);
		if(ures==151){
			alert("Haz terminado tu test\nEspera las intrucciones de tu orientadora\n ¡Gracias!");
			location.href = "index.html"
		}else{
			//obtener siguiente pregunta
			var pregunta = obtenerPregunta(ures);
            document.getElementById("question").innerHTML =ures+". "+ pregunta;
            document.getElementsByName("respuesta")[1].checked = true;
		}
		

	});

	function registraRespuesta(ida,idp,res){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"idAl": ida , "idP": idp, "res": res},
            url: '../modelos/regRes.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}


	$("#btn__regAl").click(function(){
		if ($('#alumnoF').valid()) {
			var nombre = $("#nombre").val();
			var ap = $("#a_p").val();
			var am = $("#a_m").val();
			var sexo = $('input[name="sexo"]:checked').val();
			var group = document.getElementById("selector");
            var grupo = group.options[selector.selectedIndex].value;
            var carrera = $("#carrera").val();
            //buscar el alumno en la bd, si ya existe se recupera la ultima pregunta donde se quedó
            //si no existe, lo guarda en la base de datos y presentarle la primer pregunta
            var esta = buscaAlumno(nombre.toUpperCase(),ap.toUpperCase(),am.toUpperCase(),sexo,grupo);
            if(esta == 0){
            	var registro = registraAlumno(nombre.toUpperCase(),ap.toUpperCase(),am.toUpperCase(),sexo,grupo,carrera);
            	if(registro==1){
            		alert("Alumno registrado exitosamente");
            		esta = buscaAlumno(nombre.toUpperCase(),ap.toUpperCase(),am.toUpperCase(),sexo,grupo);
            		$("#idalumno").val(esta);
            		var pregunta = obtenerPregunta(1);
            		document.getElementById("question").innerHTML = "1. "+pregunta;
            		desactivaCosos();
            	}else{
            		alert("No se pudo registrar alumno");
            	}
            }else{
            	var ultp = ultimaPreguntaRespondida(esta);
            	$("#idalumno").val(esta); //guardamos el id del alumno para uso futuro
            	if(ultp>150){
            		alert("¡Ya terminaste tu test, avisale a tu orientadora!\n¡Gracias!");
            		location.href = "index.html"
            	}else{
            		alert("¡¡Puedes continuar con tu test!!");
            	    var pregunta = obtenerPregunta(ultp);
            	    document.getElementById("question").innerHTML =ultp+". "+ pregunta;
            	    desactivaCosos();
            	}
            	
            }
        }
	});


	function ultimaPreguntaRespondida(idAl){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"idAl": idAl},
            url: '../modelos/ultPregResAl.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}

	function obtenerPregunta(idP){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"idp": idP},
            url: '../modelos/preguntas.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}


	function desactivaCosos(){
		$("#nombre").prop("disabled", true);
		$("#a_p").prop("disabled", true);
		$("#a_m").prop("disabled", true);
		$('input[name="sexo"]').prop("disabled", true);
		$("#selector").prop("disabled", true);
		$("#carrera").prop("disabled", true);
		$("#btn__regAl").hide();
		$("#btn__limpiar").hide();
		$("#preguntas").show();
	}
	function registraAlumno(nombre,ap,am,sexo,grupo,carrera){
		var dev;
      $.ajax({
		    type: 'post',
		    data: {"nombre": nombre, "ap" : ap , "am" : am , "sexo" : sexo, "grupo" : grupo, "carrera" : carrera},
            url: '../modelos/Ralumno.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
	}

	function buscaAlumno(nombre,ap,am,sexo,grupo){
	  var dev;
      $.ajax({
		    type: 'post',
		    data: {"nombre": nombre, "ap" : ap , "am" : am , "sexo" : sexo, "grupo" : grupo},
            url: '../modelos/alumno.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
		
	}

	$('#alumnoF').validate({
		rules:{
			nombre:{
				required: true,
				alfabetico: true,
				maxlength: 70
			},
			a_p: {
				required: true,
				alfabetico: true,
				maxlength: 50
			},
			a_m: {
				required: true,
				alfabetico: true,
				maxlength: 50
			},
			carrera:{
				required: true,
				maxlength: 100
			}
		},
		messages:{
			nombre:{
				required: "Debes llenar este campo",
				maxlength: "Numero de caracteres excedido"
			},
			a_p:{
				required: "Debes llenar este campo",
				maxlength: "Numero de caracteres excedido"
			},
			a_m:{
				required: "Debes llenar este campo",
				maxlength: "Numero de caracteres excedido"
			},
			carrera:{
				required: "Debes llenar este campo",
				maxlength: "Numero de caracteres excedido"
			}
		}
	});
	jQuery.validator.addMethod("alfabetico", function(value, element) {
  					return this.optional(element) || /^[a-zA-Z ñÑ]+$/i.test(value);
	}, "No se aceptan números");
});