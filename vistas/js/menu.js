
function inicio(){
	$("#inicio").show();
	$("#agGrupo").hide();
	$("#result").hide();
	$("#grafica").hide();
	$("#ecuenta").hide();
}
function agregarAlumno(){
	$("#inicio").hide();
	$("#agGrupo").show();
	$("#result").hide();
	$("#grafica").hide();
	$("#ecuenta").hide();
}
function resultados(){
	document.getElementById("selector").innerHTML = "<option value='0' onclick='muestraAls();'>-Selecciona grupo-</option>";
	$("#inicio").hide();
	$("#result").show();
	$("#agGrupo").hide();
	$("#listaG").hide();
	$("#grafica").hide();
	$("#ecuenta").hide();
	traeG();
}
function ecuenta(){
	$("#inicio").hide();
	$("#result").hide();
	$("#agGrupo").hide();
	$("#listaG").hide();
	$("#grafica").hide();
	editCuenta();
	$("#ecuenta").show();
}
function salir(){
	if(cerrarSesion()){
		alert("Hasta luego");
		location.href = "index.html"
	}else{
		alert("Hubo algun error, intentalo de nuevo o avisa al Administrador");
	}
}
function editCuenta(){
	$("#nombreOri").val(UsuarioCookie());
	$("#passwordOri").val("");
}
function UsuarioCookie(){
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
function regresar(){
	$("#result").show();
	$("#grafica").hide();
}
function muestraAls(){
	var opc = $("#selector").val();
	if(opc == 0){
		//-No seleccionado-
		$("#listaG").hide();
	}else{
		//obtener alumnos del grupo, mostrarlos en una lista
		var listA= alsDgrupo(opc);
		if(listA == 0){
			document.getElementById("listaG").innerHTML = "<tr><th>No hay alumnos en este grupo</th></tr>";
    	}else{
    		var alumnos = listA.split('|');
    		document.getElementById("listaG").innerHTML = "<thead><tr><th>Nombre del Alumno</th></tr></thead><tbody>";
    		for (var i = 0; i < alumnos.length -1 ; i++) {
    			y = i+1;
    			x = y +1;
    			w = x +1;
    			document.getElementById("listaG").innerHTML += "<tr><td onclick='btnAlum("+alumnos[i]+");'><input type='button' id='btnAlu' value='"+alumnos[y]+" "+alumnos[x]+" "+alumnos[w]+"' ></td></tr>";
    			i =w;
    		}
    		document.getElementById("listaG").innerHTML += "</tbody>";
    		document.getElementById("tablilla").addEventListener("scroll", function(){
   						var translate = "translate(0,"+(this.scrollTop -15)+"px)";
   						this.querySelector("thead").style.transform = translate;
			});
    	}
    	$("#listaG").show();
	}
}
function btnAlum(idal){
		//Aqui se van a mostrar los resultados del alumno
		//Se recibe el id
			//se busca en la tabla de evaluacion, si ya hay algun registro guardado se trae y se muestra
			//si no hay registro, se genera la evaluacion (en el servidor) y se trae
	if(estaEvaluado(idal)==0){
		//no hay evaluacion
			//hacer evaluacion
			//checar que haya respondido todas las preguntas
			if(ultRespuesta(idal)!=151){
				alert("El alumno no ha termiado de contestar su cuestionario");
			}else{
				if(hacerEvaluacion(idal)==1){
					alert("Se ha guardado la evualuación");
					eval(idal);
				}else{
					alert("Hubo algún error y no se guardó la evaluacion completa");
				}
			}//traer evaluacion
	}else{
		//ya esta evaluado
			//traer evaluacion
		eval(idal);
	}
}
function ultRespuesta(idal){
	var dev;
      $.ajax({
		    type: 'post',
		    data: {"idAl": idal},
            url: '../modelos/ultPregResAl.php',
            async: false
      })
      .done(function(data){
            dev = data;
      });
      return (dev);
}
function eval(idal){
	$("#grafica").show();
	$("#result").hide();
	var results = traerEvaluacion(idal);
	var carreraint = carreraInteres(idal);
	var resultados = results.split('|');
	imprimirGrafica(resultados);
	document.getElementById("carreraInt").innerHTML = "Le interesa " + carreraint;
	document.getElementById("identificadores").innerHTML = "<table id='tablaId'><thead><tr style='background-color:#5fd40f; color: white;'><th>Identificador</th><th>Area</th></tr></thead>"+
	"<tbody>"+
		"<tr class='fisico'><td>1. Calc:</td><td> Calculo</td></tr>"+
		"<tr class='fisico'><td>2. FQ:</td><td>Fisico-Quimica</td></tr>"+
		"<tr class='fisico'><td>3. Cons:</td><td>Construcción</td></tr>"+
		"<tr class='fisico'><td>4. Tec:</td><td>Tecnologica</td></tr>"+
		"<tr class='quimico'><td>5. GeA:</td><td>Geoastronomica</td></tr>"+
		"<tr class='quimico'><td>6. BioA:</td><td>Bioagropecuaria</td></tr>"+
		"<tr class='quimico'><td>7. BioS:</td><td>Biosanitaria</td></tr>"+
		"<tr class='humanidades'><td>8. AsEd:</td><td>Asistencia Educacional</td></tr>"+
		"<tr class='economico'><td>9. JP:</td><td>Juridico-Politica</td></tr>"+
		"<tr class='economico'><td>10. EA:</td><td>Economico Administrativa</td></tr>"+
		"<tr class='humanidades'><td>11. CS:</td><td>Comunicación Social</td></tr>"+
		"<tr class='humanidades'><td>12. HC:</td><td>Humanistica Cultural</td></tr>"+
		"<tr class='ninguno'><td>13. AP:</td><td>Artistico-Plastica</td></tr>"+
		"<tr class='ninguno'><td>14. AM:</td><td>Artistico-Músical</td></tr>"+
		"<tr class='ninguno'><td>15. LE:</td><td>Lenguas Extranjeras</td></tr>"+
	"</tbody></table>";
}
function carreraInteres(idal){
	var dev;
      $.ajax({
		    type: 'post',
		    data: {"ida": idal},
            url: '../modelos/carreraInt.php',
            async: false
      })
      .done(function(data){
            dev = data;   
      });
      return (dev);
}
function traerEvaluacion(idal){
	var dev;
      $.ajax({
		    type: 'post',
		    data: {"idg": idal},
            url: '../modelos/traeEval.php',
            async: false
      })
      .done(function(data){
            dev = data;   
      });
      return (dev);
}
function imprimirGrafica(resultados){
	var nombreCompleto = resultados[15] + " "+ resultados[16]+" "+resultados[17];
	var y1 = parseInt(resultados[0]);
	var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: nombreCompleto
	},
	axisX:{
		includeZero: false,
		title: "Area"
	},
	axisY:{
		includeZero: false,
		title: "Percentil",
		stripLines: [{
			value: 50,
			label: "Media"
		}]
	},
	data: [{        
		type: "line",
		color: "#A9A9A9",       
		dataPoints: [
			{x:1 , y: parseInt(resultados[0]),indexLabel: "Calc" ,markerColor: "#0000cd"},
			{x:2 , y: parseInt(resultados[1]),indexLabel: "FQ" ,markerColor: "#0000cd"},
			{x:3 , y: parseInt(resultados[2]),indexLabel: "Cons" ,markerColor: "#0000cd"},
			{x:4 , y: parseInt(resultados[3]),indexLabel: "Tec",markerColor: "#0000cd" },
			{x:5 , y: parseInt(resultados[4]),indexLabel: "GeA" ,markerColor: "#ff7f50"},
			{x:6 , y: parseInt(resultados[5]),indexLabel: "BioA",markerColor: "#ff7f50" },
			{x:7 , y: parseInt(resultados[6]),indexLabel: "BioS",markerColor: "#ff7f50" },
			{x:8 , y: parseInt(resultados[7]),indexLabel: "AsEd",markerColor: "#ff00ff" },
			{x:9 , y: parseInt(resultados[8]),indexLabel: "JP",markerColor: "#7FFF00" },
			{x:10 , y: parseInt(resultados[9]),indexLabel: "EA",markerColor: "#7FFF00" },
			{x:11 , y: parseInt(resultados[10]),indexLabel: "CS",markerColor: "#ff00ff" },
			{x:12 , y: parseInt(resultados[11]),indexLabel: "HC",markerColor: "#ff00ff" },
			{x:13 , y: parseInt(resultados[12]),indexLabel: "AP", markerColor: "black" },
			{x:14 , y: parseInt(resultados[13]),indexLabel: "AM", markerColor: "black" },
			{x:15 , y: parseInt(resultados[14]),indexLabel: "LE", markerColor: "black" }
		]
	}]
});
chart.render();
}
function hacerEvaluacion(ida){
	var dev;
      $.ajax({
		    type: 'post',
		    data: {"ida": ida},
            url: '../modelos/hacerEvaluacion.php',
            async: false
      })
      .done(function(data){
            dev = data;  
      });
      return (dev);
}
function estaEvaluado(ida){
	var dev;
      $.ajax({
		    type: 'post',
		    data: {"ida": ida},
            url: '../modelos/estaEvaluado.php',
            async: false
      })
      .done(function(data){
            dev = data; 
      });
      return (dev);
}
function alsDgrupo(idg){
	var dev;
      $.ajax({
		    type: 'post',
		    data: {"idg": idg},
            url: '../modelos/alDg.php',
            async: false
      })
      .done(function(data){
            dev = data;  
      });
      return (dev);
}
function traeG(){
	var xhttp; 
 		 xhttp = new XMLHttpRequest();
 		 xhttp.onreadystatechange = function() {
    			if (this.readyState == 4 && this.status == 200) {
    				var x = this.responseText;
    				if(x == 0){
    					alert(
    						"NO hay grupos guardados en la Base de Datos");
    					inicio();
    				}else{
    					document.getElementById("selector").innerHTML += x;
    				}
    			}
  		 };
  		xhttp.open("GET", "../modelos/listaGruposOri.php", true);
  		xhttp.send();
} 