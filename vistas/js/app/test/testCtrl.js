(function(){
    'use strict'
    angular.module('mooniart.ubikt').controller('testCtrl', testCtrl);
    testCtrl.$inject = ['$scope','$timeout','utilsServ','testServ'];
    function testCtrl($scope, $timeout,utilsServ,testServ){
        var vm = this;
        window.onresize = resize;
        vm.utilsServ = utilsServ;
        vm.ingresaAlumno = ingresaAlumno;
        vm.muestraTalPregunta = muestraTalPregunta;
        vm.setMostrarPanel = setMostrarPanel;
        vm.setMostrarDatos = setMostrarDatos;
        vm.guardarRespuesta = guardarRespuesta;
        vm.guardarCarrera = guardarCarrera;
        inicio();
        function inicio(){
            resize()
            utilsServ.setSHModal(false);
            vm.inicio = true;
            vm.preguntaActual = 0;
            vm.mostrarPanel = false;
            vm.mostrarDatos = false;
            vm.listaPreguntas  = [];
        }
        function guardarCarrera(){
            if(testServ.guardaCarrera(vm.idAl,vm.carrera) == "1"){
                 $scope.mensaje = utilsServ.shModal("Datos guardados con exito"); 
            }else{
                 $scope.mensaje = utilsServ.shModal("No se guardó el campo Carrera\n\nIntenta nuevamente"); 
            }
        }
        function guardarRespuesta(){
               console.log('Respuesta',vm.respuestaQ)
            if(vm.respuestaQ != null){
                //Aqui va rutina para guardar en bd
                //Hacer persistencia
                var ok = testServ.registraRespuesta(vm.idAl,vm.listaPreguntas[vm.preguntaActual].id,vm.respuestaQ)
                // var ok = 1
                if(ok == 1){
                    //si no hay error en el guardado
                    vm.listaPreguntas[vm.preguntaActual].respuesta = vm.respuestaQ;
                    vm.listaPreguntas[vm.preguntaActual].contestada = true;
                    vm.preguntaActual++;
                    vm.preguntaActual++;
                    muestraTalPregunta(vm.preguntaActual) 
                }else{
                    $scope.mensaje = utilsServ.shModal("No se guardó respuesta\n\nIntenta nuevamente");
                }
            }else{
                //mostrar modal de que debe seleccionar respuesta
                $scope.mensaje = "Es necesario que ingreses una respuesta";
                utilsServ.shModal(""); 
            }     
        }
        function salir(){
            $scope.accion = 'salir'
            $scope.mensaje = utilsServ.shModal("Haz terminado el test, avisale a tu orientador@");
        }
        function setMostrarPanel(bol){
            vm.mostrarPanel = bol;
            if(bol){
                $("#cuerpo3").show();
            }else{
                $("#cuerpo3").hide();
            }
        }
        function setMostrarDatos(bol){
            vm.mostrarDatos = bol;
            if(bol){
                $(".datos").show();
            }else{
                $(".datos").hide();
            }
        }
        function muestraTalPregunta(idPregunta){
            if(idPregunta > vm.listaPreguntas.length){
                //kacaa
                if(utilsServ.hacerEvaluacion(vm.idAl)==1){
                    $scope.mensaje = utilsServ.shModal("Se ha guardado la evualuación");
                }else{
                    $scope.mensaje = utilsServ.shModal("Hubo algún error y no se guardó la evaluacion completa");
                }
                salir()
            }else{
                console.log('Pregunta',vm.listaPreguntas.find(element => element.numPregunta == idPregunta))
                vm.preguntaActual = idPregunta -1;
                vm.respuestaQ = vm.listaPreguntas[vm.preguntaActual].respuesta;   
            }
        }
        function parseSexo(s){
            switch(s){
                case "M":
                    return "Masculino";
                case "F":
                    return "Femenino";
            }
        }
        function ingresaAlumno(){
            //Valida dato
            if(vm.clave != undefined){
                //Busca alumno
                    //Setear campos
                var esta = JSON.parse(utilsServ.buscaAlumno(vm.clave));
                if(esta == null){
                    $scope.mensaje = utilsServ.shModal("No se encuentran datos con esta clave: "+vm.clave+ 
                        ", Si tu clave es correcta prueba revisar tu conexión a internet y si el problema persiste," + 
                        "avisale a tu orientador@");
                    utilsServ.setSHModal(false);
                    return false;
                }
                if(esta[0] != 0){
                    vm.idAl = esta[0];
                    vm.nombre = esta[1];
                    vm.ap = esta[2];
                    vm.am = esta[3];
                    vm.sexo = parseSexo(esta[4]);
                    vm.grupo = testServ.getGrupoAlumno(vm.idAl)
                    vm.carrera = esta[7];
                   //Ir por lista de preguntas
                   var todasPreguntas = JSON.parse(testServ.getListaPreguntas()); //Todas
                   var respuestas = JSON.parse(testServ.getListaRespuestas(vm.idAl));
                   if(todasPreguntas == null || respuestas == null){
                       $scope.mensaje = utilsServ.shModal("No se pudieron cargar los datos, Revisa tu conexión e intenta de nuevo");
                        utilsServ.setSHModal(false);
                        return false; 
                   }
                   matchPreguntas(todasPreguntas,respuestas);
                   //Ir por ultima respondida
                   if(vm.listaPreguntas[149].contestada == true){
                    salir()
                   }
                   if(esta[5] == 0){
                    esta[5] = vm.listaPreguntas[0].id
                   }
                   var ur = vm.listaPreguntas.find(element => element.id == esta[5]).numPregunta//Id de la pregunta
                   if(ur == null){
                        // utilsServ.setSHModal(false);
                        $scope.mensaje = utilsServ.shModal("No se pudieron cargar los datos, Revisa tu conexión e intenta de nuevo");
                        return false;
                   }
                    muestraTalPregunta(parseInt(ur))
                   vm.inicio = false; 
                }else{
                    //No se encuentra el alumno
                    $scope.mensaje = utilsServ.shModal("No se encuentran datos con esta clave: "+vm.clave);
                }
            }else{
                $scope.mensaje = utilsServ.shModal("Debes ingresar tu clave para ingresar");
            }
        }
        function matchPreguntas(preguntas,respuestas){
            if(respuestas.length == 0){
             for (var i = 0; i < preguntas.length ; i= i +3) {
                    //Buscar respuesta
                    contestada = false;
                    resp = null;
                    vm.listaPreguntas.push({"id":preguntas[i],"numPregunta":preguntas[i+1],"pregunta": preguntas[i+2],"contestada": contestada,"respuesta":resp});
                }   
            }else{
                for (var i = 0; i < preguntas.length ; i= i +3) {
                    //Buscar respuesta
                    var ind =respuestas.findIndex((element)=> element == preguntas[i])
                    var contestada = false;
                    var resp = null
                    if(ind != -1){
                        contestada = true;
                        resp = respuestas[ind + 2];
                    }
                    vm.listaPreguntas.push({"id":preguntas[i],"numPregunta":preguntas[i+1],"pregunta": preguntas[i+2],"contestada": contestada,"respuesta":resp});
                }
            }
        }
        function resize(){
            vm.anchoW = $(window).width()
            vm.largoW = $(window).height()
            vm.shT = vm.anchoW <= 999 ;
            if($(window).width() >= 1000){//grande
              setMostrarPanel(true)
              setMostrarDatos(true)
            }else{
                setMostrarPanel(false)
                setMostrarDatos(true)
            }
        } 
    }
})();