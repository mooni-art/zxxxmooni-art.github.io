function inicio(){
	$("#inicio").show();
	$("#agUsuario").hide();
	$("#bUsuario").hide();
	$("#monitoreo").hide()
}
function bajaUsuario(){
	listaUsuarios();
	$("#inicio").hide();
	$("#agUsuario").hide();
	$("#bUsuario").show();
	$("#monitoreo").hide();
}
function monitoreo(){
	$("#inicio").hide();
	$("#agUsuario").hide();
	$("#bUsuario").hide();
	$("#monitoreo").show();
	document.getElementById("activity").innerHTML = ""
	muestraActividades();
}
function ecuenta(){
	alert("Estamos trabajando en esto!\nDisculpa las molestias");
}
function muestraActividades(){
	var dev;
      $.ajax({
		    type: 'post',
		    data: {"ul": 1},
            url: '../modelos/traeAct.php',
            async: false
      })
      .done(function(data){
            dev = data;  
      });
      var us = dev.split("|");
	for (var i = 0; i < us.length -1 ; i++) {
    	document.getElementById("activity").innerHTML += "<tr><td>"+us[i]+"</td><td>"+us[i+1]+"</td><td>"+us[i+2]+"</td><td>"+us[i+3]+" "+us[i+4] +"</td><td>"+us[i+5]+"</td> </tr>";
    	i =i+5;
    }
    if(us.length -1==0){
    	document.getElementById("activity").innerHTML += "<tr><td colspan='5'><h1>No se encontraron actividades nuevas</h1></td></tr>";
    }	
}
function listaUsuarios(){
	document.getElementById("listau").innerHTML ="";
	var lu = obtU($("#user").val());
	var us = lu.split("|");
	for (var i = 0; i < us.length -1 ; i++) {
    	y = i+1;
    	document.getElementById("listau").innerHTML += "<option value="+us[i]+">"+us[y]+" </option>";
    	i =y;
    }
}
function obtU(usuarioLogeado){
	var dev;
      $.ajax({
		    type: 'post',
		    data: {"ul": usuarioLogeado},
            url: '../modelos/lUs.php',
            async: false
      })
      .done(function(data){
            dev = data;   
      });
      return (dev);
}
function resultados(){
	document.getElementById("selector").innerHTML = "<option value='0' onclick='muestraAls();'>-Selecciona grupo-</option>";
	$("#inicio").hide();
	$("#result").show();
	$("#agGrupo").hide();
	$("#listaG").hide();
	$("#grafica").hide();
	traeG();
}
function salir(){
	if(cerrarSesion()){
		alert("Hasta luego");
		location.href = "index.html"
	}else{
		alert("Hubo algun error, intentalo de nuevo o avisa al Administrador");
	}
}
function cerrarSesion(){
	var dev;
      $.ajax({
		    type: 'post',
		    data: {"cooki": "usuario"},
            url: '../controlador/cierraSesion.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
}