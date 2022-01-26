(function(){
    'use strict'
    angular.module('mooniart.ubikt').controller('orientadorCtrl', orientadorCtrl);
    orientadorCtrl.$inject = ['$scope','$timeout','orientadorServ','utilsServ'];
    function orientadorCtrl($scope, $timeout,orientadorServ,utilsServ){
        var vm = this;
        vm.utilsServ = utilsServ 
        vm.crearGrupo = crearGrupo;
        vm.limpiarCampos = limpiarCampos;
        vm.getListaAlumnosClave = getListaAlumnosClave;
        vm.mostrarIndentificadores = mostrarIndentificadores;
        vm.verResultados = verResultados;
        vm.editarCuenta  = editarCuenta;
        vm.cargarDatos = cargarDatos;
        vm.getReporte = getReporte;
        vm.listGrupos = [{"id":1,"nombre":"1000"}]
        vm.repor = "xgrupo"
        vm.area = "1"
        inicio()
        document.getElementsByTagName("body")[0].onresize = function(){utilsServ.resize();} 
        function getReporte(){
            var r= [];
            if(vm.repor == "xgrupo"){
                r = orientadorServ.traerEvaluacionGA('g',vm.group)
            }else{
                r = orientadorServ.traerEvaluacionGA('a',vm.area)
                vm.nameArea = vm.area;
            }
            var repo = r.split('|'); //Cada 4 es una evaluación nueva
            vm.reporte = []
            for (var i = 0; i < repo.length - 4; i=i+4) {
                //buscamos el alumno en el array
                var al = JSON.parse(orientadorServ.buscaAlumnoID(repo[i]))
                var alumno = vm.reporte.find(element => element.idAl == al[0]);
                var res = []
                if(alumno == undefined){
                  res.push({"area": repo[i+1] ,"puntaje": repo[i+2],"percentil":repo[i+3]})
                  vm.reporte.push({"idAl":al[0],"alumno": al[1]+" "+al[2]+" "+al[3] , "result":res})
                }else{//Actualizo con el area
                    var aux = vm.reporte.indexOf(alumno);
                    var resAux = vm.reporte[aux].result;
                    resAux.push({"area": repo[i+1] ,"puntaje": repo[i+2],"percentil":repo[i+3]});
                    vm.reporte[aux].result = resAux;               
                }
            }
            console.log(vm.reporte)
        }
        function verResultados(idal){
            //Aqui se van a mostrar los resultados del alumno
            //Se recibe el id
            //se busca en la tabla de evaluacion, si ya hay algun registro guardado se trae y se muestra
            //si no hay registro, se genera la evaluacion (en el servidor) y se trae
            // esta no wey utilsServ.setSHModal(true);
            limpiaValores()
            if(orientadorServ.estaEvaluado(idal)==0){
                //no hay evaluacion
                //hacer evaluacion
                //checar que haya respondido todas las preguntas
                if(orientadorServ.ultRespuesta(idal)!=151){
                    $scope.mensaje = utilsServ.shModal("El alumno no ha termiado de contestar su cuestionario");
                }else{
                    if(utilsServ.hacerEvaluacion(idal)==1){
                        $scope.mensaje = utilsServ.shModal("Se ha guardado la evualuación");
                        evalu(idal);
                    }else{
                        $scope.mensaje = utilsServ.shModal("Hubo algún error y no se guardó la evaluacion completa");
                    }
                }//traer evaluacion
            }else{
                //ya esta evaluado
                //traer evaluacion
                evalu(idal);
            }
            // utilsServ.setSHModal(false);
        }
        function evalu(idal){
            $(".grafica").show();
            utilsServ.setOpcMenu('grafica',vm);
            if(traeAreas()!=null){
              var resultados = [];
                vm.listAreas.forEach(function(item){
                    var results = orientadorServ.traerEvaluacion(idal,item.id);
                    if(results != null){
                         var res = results.split('|');
                        resultados.push({"nombreArea":item.nombre,"Percentil":res[0],"Nombre":res[1] + " "+ res[2]+" "+res[3]})
                    }else{
                        $scope.mensaje = utilsServ.shModal("No se pudo obtener el resultado del area: "+item.nombre);   
                    }
                }) 
            
                var carreraint = orientadorServ.carreraInteres(idal);
                // resultados = ["50","40","50","50","80","50","50","10","50","50","50","50","50",
                // "50","70","Simon","Fabila","Reyes"]
                console.log(resultados.length)
                if(resultados.length != 15){
                    $scope.mensaje = utilsServ.shModal("No se pudo obtener todos los resultados");
                    return null;
                }
                imprimirGrafica(resultados);
                document.getElementById("carreraInt").innerHTML = "Le interesa " + carreraint;  
            }else{
                $scope.mensaje = utilsServ.shModal("No se pudo obtener la lista de areas, revisa tu conexión");   
            }
        }
        function mostrarIndentificadores(){
             $(".tablilla").toggle();
        }
        function imprimirGrafica(resultados){
            var nombreCompleto = resultados[0].Nombre;
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
                    {x:1 , y: parseInt(resultados.find(element => element.nombreArea == "CALCULO").Percentil),indexLabel: "Calc" ,markerColor: "#0000cd"},
                    {x:2 , y: parseInt(resultados.find(element => element.nombreArea == "FISICO-QUIMICA").Percentil),indexLabel: "FQ" ,markerColor: "#0000cd"},
                    {x:3 , y: parseInt(resultados.find(element => element.nombreArea == "CONSTRUCCION").Percentil),indexLabel: "Cons" ,markerColor: "#0000cd"},
                    {x:4 , y: parseInt(resultados.find(element => element.nombreArea == "TECNOLOGIA").Percentil),indexLabel: "Tec",markerColor: "#0000cd" },
                    {x:5 , y: parseInt(resultados.find(element => element.nombreArea == "GEOASTRONOMICA").Percentil),indexLabel: "GeA" ,markerColor: "#ff7f50"},
                    {x:6 , y: parseInt(resultados.find(element => element.nombreArea == "BIOAGROPECUARIA").Percentil),indexLabel: "BioA",markerColor: "#ff7f50" },
                    {x:7 , y: parseInt(resultados.find(element => element.nombreArea == "BIOSANITARIA").Percentil),indexLabel: "BioS",markerColor: "#ff7f50" },
                    {x:8 , y: parseInt(resultados.find(element => element.nombreArea == "ASISTENCIA EDUCACIONAL").Percentil),indexLabel: "AsEd",markerColor: "#ff00ff" },
                    {x:9 , y: parseInt(resultados.find(element => element.nombreArea == "JURIDICO-POLITICA").Percentil),indexLabel: "JP",markerColor: "#7FFF00" },
                    {x:10 , y: parseInt(resultados.find(element => element.nombreArea == "ECONOMICO ADMINISTRATIVA").Percentil),indexLabel: "EA",markerColor: "#7FFF00" },
                    {x:11 , y: parseInt(resultados.find(element => element.nombreArea == "COMUNICACION SOCIAL").Percentil),indexLabel: "CS",markerColor: "#ff00ff" },
                    {x:12 , y: parseInt(resultados.find(element => element.nombreArea == "HUMANISTICA CULTURAL").Percentil),indexLabel: "HC",markerColor: "#ff00ff" },
                    {x:13 , y: parseInt(resultados.find(element => element.nombreArea == "ARTISTICO-PLASTICA").Percentil),indexLabel: "AP", markerColor: "black" },
                    {x:14 , y: parseInt(resultados.find(element => element.nombreArea == "ARTISTICO-MUSICAL").Percentil),indexLabel: "AM", markerColor: "black" },
                    {x:15 , y: parseInt(resultados.find(element => element.nombreArea == "LENGUAS EXTRANJERAS").Percentil),indexLabel: "LE", markerColor: "black" }
                ]
            }]
            });
            chart.render();
        }
        function limpiarCampos(){
            vm.nomg = "";
            vm.listaAlumnos = "";
            //Activa botón guardar
            vm.btnActivo = false;
            vm.reporte = []
        }
        function crearGrupo(){
            // utilsServ.setSHModal(true);
            console.log('Crear Grupo: ',vm.nomg)
            console.log('Crear Grupo: ',vm.listaAlumnos)
            if(vm.nomg == undefined){
                $scope.mensaje = utilsServ.shModal("Debes ingresar un nombre de Grupo");
            }else{
                //guardar grupo
                var idg = guardaGrupo()
                if( vm.listaAlumnos != undefined && idg != undefined){
                   var lisAl = vm.listaAlumnos.split("\n") 
                   guardarAlumnos(idg,lisAl)
                   vm.getListaAlumnosClave(idg);
                   vm.btnActivo = true;
                }else{
                    $scope.mensaje = utilsServ.shModal("No se guardó la lista de alumnos");
                }
            }
        }
        function guardaGrupo(){
            if(utilsServ.numerico(vm.nomg)){
                var idg = orientadorServ.estaGrupo(vm.nomg,localStorage.getItem('id'))
                if(idg == null){
                    $scope.mensaje = utilsServ.shModal("Ocurrió un error en el servicio (Esta grupo)\n"
                        +"No se guardó el grupo");
                   return undefined; 
                } 
                if(idg != 0){
                    //ya esta registrado
                    return idg;
                    //Guardar alumnos
                }else{
                    //no esta registrado
                    var ok = orientadorServ.guardaGrupo(vm.nomg,localStorage.getItem("id"));
                    if(ok == 1){
                        $scope.mensaje = utilsServ.shModal("Grupo guardado exitosamente");
                        var idg = orientadorServ.estaGrupo(vm.nomg,localStorage.getItem('id'))
                        vm.nomg = "";
                        return idg;
                    }else{
                        $scope.mensaje = utilsServ.shModal("No se pudo guardar el grupo");
                    }
                }
                //checar si ese grupo no ha sido registrado
                //si no esta registrado se guarda y se notifica
                //si ya esta registrado se notifica el error
            }else{
             $scope.mensaje = utilsServ.shModal("Nombre de grupo invalido\nEl tamaño del nombre debe ser de 3 digitos\nLos nombres de grupo son númericos (ej. 501)");
            }
        }
        function guardarAlumnos(idg,listaAlumnos){
            var reNumer = new RegExp('[0-9]+');
            var reCar = new RegExp('[!|\"|#|$|%|&|/|(|)|=|?|¡|¿|+|-|<|>|\'|{|}||,|.]+')
            var reSexo = new RegExp('[m|M|f|F]')
            //Recorrer lista alumnos
                //Checar si cumple con la expresion regular indicada
            listaAlumnos.forEach(function(item){
                var datosAlumno = item.split("-");
                if(datosAlumno.length == 4){
                    var valido = true;
                    var razon = ""
                    console.log('Guardar Alumnos',datosAlumno[0])
                    if(reNumer.test(datosAlumno[0]) || datosAlumno[0] == "" || reCar.test(datosAlumno[0])){//validar nombre
                        razon = "Nombre"
                        valido = false;
                    }else if(reNumer.test(datosAlumno[1]) || datosAlumno[1] == "" || reCar.test(datosAlumno[1])){//Valida ap
                            razon = "Apellido Paterno"
                            valido = false;
                          }else if(reNumer.test(datosAlumno[2]) || datosAlumno[2] == "" || reCar.test(datosAlumno[2])){
                            razon = "Apellido Materno"
                            valido = false;
                          }else if(!reSexo.test(datosAlumno[3]) || datosAlumno[3].length > 1){
                            razon = "Genero"
                            valido = false;
                          }
                    if(valido){
                        //Rutina para guardar
                        // generaClave(datosAlumno);
                        var esta = orientadorServ.buscaAlumno(datosAlumno[0].toUpperCase(),datosAlumno[1].toUpperCase(),
                            datosAlumno[2].toUpperCase(),datosAlumno[3].toUpperCase(),idg);
                        esta = JSON.parse(esta)
                        console.log('Ultimo: ',esta)
                        if(esta[0] == 0){//No está
                            var registro = orientadorServ.registraAlumno(datosAlumno[0].toUpperCase(),datosAlumno[1].toUpperCase(),
                            datosAlumno[2].toUpperCase(),datosAlumno[3].toUpperCase(),idg,"-",generaClave(datosAlumno));
                            if(registro=="1"){
                            }else{
                                $scope.mensaje = utilsServ.shModal("No se pudo registrar Alumno: "+datosAlumno);
                            }
                        }else{//Ya está registrado
                            if(esta == null){
                                $scope.mensaje = utilsServ.shModal("Ocurrió un error en el servicio(buscaAlumno)"); 
                            }else{
                               $scope.mensaje = utilsServ.shModal("Alumno "+datosAlumno+" ya está registrado"); 
                           }
                        }
                    }else{
                       $scope.mensaje = utilsServ.shModal("El campo " + datosAlumno + " No cumple con los requerimnientos\n"+
                        "Motivo("+razon+" invalido)\nNo se guardó"); 
                    }
                }else{
                    $scope.mensaje = utilsServ.shModal("El campo " + datosAlumno + " No cumple con los requerimnientos\n");
                } 
            })
            //Ir por lista de alumnos con su clave
        }
        function getListaAlumnosClave(opc){
            vm.tblAlumnos = []
            var listA= orientadorServ.alsDgrupo(opc);
            if(listA == 0){
                vm.listaAlumnos= "No hay alumnos en este grupo";
            }else{
                var alumnos = listA.split('|');
                vm.listaAlumnos = "----- Nombre del Alumno ---------------- Clave -----\n";
                for (var i = 0; i < alumnos.length -1 ; i++) {
                    var y = i+1;
                    var x = y +1;
                    var w = x +1;
                    var z = w + 1;
                    vm.listaAlumnos = vm.listaAlumnos + alumnos[y]+"\t"+alumnos[x]+"\t"+alumnos[w]+"\t" +alumnos[z]+"\n";
                    vm.tblAlumnos.push({"id":alumnos[i],"nombre":alumnos[y]+" "+alumnos[x]+" "+alumnos[w]})
                    i =z;
                }
            }
            //Desactiva botón Guardar
            vm.btnActivo = true;
        }
        function generaClave(datos){
            var today = new Date();
            var milliseconds = today.getMilliseconds() + "";
            console.log('Clave: ',datos[0].slice(0,1) + datos[1] + datos[2].slice(0,1) + milliseconds.slice(0,3))
            var clave = datos[0].slice(0,1) + datos[1] + datos[2].slice(0,1) + milliseconds.slice(0,3);
            clave = clave.replace(/ /g, "")
            return clave;
            //primera_letra_nombre.paterno.primera_letra_am.aleatorio
        }
        function editarCuenta(){
            var msj = utilsServ.editarCuenta($scope.enombre,$scope.epss,$scope.epssnew,$scope.epssnew1);
            $scope.mensaje = utilsServ.shModal(msj);
            if(msj = "Usuario actualizado exitosamente"){
                $scope.epss = ""
                $scope.epssnew = ""
                $scope.epssnew1 = ""
            }  
        }
        function inicio(){
            console.log("Orientador")
            utilsServ.setSHModal(false);
            vm.shMensaje = false;
            utilsServ.setshMenu(true);
            utilsServ.setOpcMenu('inicio',vm) 
            vm.repor = 'xgrupo';
            vm.group = "-1"
            vm.area = "-1"
            vm.btnActivo = false;
            vm.listGrupos = []
            vm.listAreas = []
            utilsServ.resize()
            $(".grafica").hide();
            if(utilsServ.inicio()==null){
                $scope.accion = 'salir'
                $scope.mensaje = utilsServ.shModal("Debes iniciar Sesión primero"); 
            }
        }
        function traeGrupos(){
            vm.listGrupos = []
            var a  = orientadorServ.traeG(localStorage.getItem('id'))
            a = JSON.parse(a)
            if(a != null){
                for (var i = 0; i < a.length ; i= i + 3) {
                    vm.listGrupos.push({"id":a[i],"nombre":a[i+1]})
                }
            }else{
               $scope.mensaje = utilsServ.shModal("Hubo un error obteniendo\nlos grupos, reingresa a la opción por favor, o revisa tu conexión a la red"); 
            }
        }
        function traeAreas(){
            var a  = orientadorServ.traeAreas()
            a = JSON.parse(a)
            if(a != null){
                for (var i = 0; i < a.length ; i= i + 2) {
                    vm.listAreas.push({"id":a[i],"nombre":a[i+1]})
                }
                return true;
            }else{
                return null;
               $scope.mensaje = utilsServ.shModal("Hubo un error obteniendo\nlas areas, reingresa a la opción por favor, o revisa tu conexión a la red"); 
            }
        }
        function limpiaValores(){
            vm.listAreas = [];
            vm.resultados = [];
        }
        function cargarDatos(op){
            limpiaValores()
            $(".grafica").hide();
            switch(op){
                case 'resultados':
                    //traer grupos de la orientadora
                    traeGrupos();
                break;
                case 'reportes':
                    //traer grupos de la orientadora
                    traeGrupos();
        // {"nombre":"FISICO-QUIMICA","id":2},
        // {"nombre":"CONSTRUCCION","id":3},
        // {"nombre":"TECNOLOGIA","id":4},
        // {"nombre":"GEOASTRONOMICA","id":5},
        // {"nombre":"BIOAGROPECUARIA","id":6},
        // {"nombre":"BIOSANITARIA","id":7},
        // {"nombre":"ASISTENCIA EDUCACIONAL","id":8},
        // {"nombre":"JURIDICO-POLITICA","id":9},
        // {"nombre":"ECONOMICO ADMINISTRATIVA","id":10},
        // {"nombre":"COMUNICACION SOCIAL","id":11},
        // {"nombre":"HUMANISTICA CULTURAL","id":12},
        // {"nombre":"ARTISTICO-PLASTICA","id":13},
        // {"nombre":"ARTISTICO-MUSICAL","id":14},
        // {"nombre":"LENGUAS EXTRANJERAS","id":15}
        // ]
                    //traer areas (checar si es catalogo o debe ser en el html)
                    traeAreas();
                    vm.area = "-1"
                break;
                case 'goToInicio':
                    location.href = " ../vistas/index.html"
                break;
                case 'ecuenta':
                    //Obtener datos de usuario loggeado
                    $scope.enombre = localStorage.getItem("user");
                break;
                case 'grafica':
                  $(".grafica").show();  
                break;          
            }
        }
    }
})();