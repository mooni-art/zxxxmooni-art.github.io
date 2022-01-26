(function(){
    'use strict'
    angular.module('mooniart.ubikt').controller('admonCtrl', admonCtrl);
    admonCtrl.$inject = ['$scope','$timeout','admonServ','utilsServ'];
    function admonCtrl($scope, $timeout,admonServ,utilsServ){
        var vm = this;
        vm.utilsServ = utilsServ
        vm.agregarUsuario = agregarUsuario;
        vm.bajaUsuario = bajaUsuario;
        vm.cargarDatos = cargarDatos;
        vm.editarCuenta = editarCuenta;
        inicio()
        document.getElementsByTagName("body")[0].onresize = function(){utilsServ.resize();}
        function editarCuenta(){
            var msj = utilsServ.editarCuenta($scope.enombre,vm.epss,vm.epssnew,vm.epssnew1);
            $scope.mensaje = utilsServ.shModal(msj);
            if(msj = "Usuario actualizado exitosamente"){
                $scope.epss = ""
                $scope.epssnew = ""
                $scope.epssnew1 = ""
            } 
        }
        function bajaUsuario(){
            utilsServ.setSHModal(true);
            if(vm.buser == "-1"){
                $scope.mensaje = utilsServ.shModal("Usuario no seleccionado"); 
            }else{
                if(admonServ.bajausuario(vm.buser)=="1"){
                    $scope.mensaje = utilsServ.shModal("Usuario eliminado exitosamente"); 
                }else{
                    $scope.mensaje = utilsServ.shModal("No se pudo eliminar usuario"); 
                }
            }
             utilsServ.setSHModal(false);
        }
        function agregarUsuario(){
            vm.shMensaje = false
            if(validaNombre(vm.nombre,vm.pss,vm.pss1)){ 
                var e = admonServ.estaUsuario(vm.nombre)
                if(e == null){
                    //ya esta registrado
                    $scope.mensaje = utilsServ.shModal("No se pudo ejecutar la busqueda del usuario, Verifica tu conexión"); 
                }else{
                    if(e == 0){
                        //no esta registrado
                        var ok = admonServ.guardaUsuario(vm.nombre,vm.pss,vm.rol);
                        console.log(ok)
                        if(ok == "1"){
                            $scope.mensaje = utilsServ.shModal("Usuario guardado exitosamente");
                            vm.nombre = ""
                            vm.pss = ""
                            vm.pss1 = ""
                        }else{
                            $scope.mensaje = utilsServ.shModal("No se pudo guardar el usuario");
                        }
                    }else{
                        $scope.mensaje = utilsServ.shModal("¡Este usuario ya está registrado!\nNo se guardó");
                    }
                }
            //checar si ese grupo no ha sido registrado
                //si no esta registrado se guarda y se notifica
                //si ya esta registrado se notifica el error
            }else{
            }
        }
        function inicio(){
            utilsServ.resize();
            vm.repor = 'xgrupo';
            vm.nomg = "";
            vm.shMensaje = false;
            vm.buser = "-1"
            vm.rol = "orientador"
            utilsServ.setOpcMenu('inicio',vm)
            vm.listaAlumnos = ""
             if(utilsServ.inicio()==null){
                $scope.accion = 'salir'
                $scope.mensaje = utilsServ.shModal("Debes iniciar Sesión primero"); 
             }
        } 
        function validaNombre(nombre,pss,pss1){
            if(nombre != undefined && pss != undefined && pss1 != undefined){
                if(nombre.length > 10 || nombre.length < 4){
                    vm.mensaje = "El nombre es invalido\nEl nombre de usuario debe tener entre 4 y 10 caracteres"
                    vm.shMensaje = true
                 return false;
                }
                if(pss.length > 15 || pss.length < 6){
                    vm.mensaje = "La contraseña debe tener al menos 6 caracteres (Maximo 15)"
                    vm.shMensaje = true
                    return false;
                }
                if(pss1.length == 0){
                    vm.mensaje = "Debes llenar todos los campos"
                    vm.shMensaje = true
                    return false;
                }
                if(pss != pss1){
                    vm.mensaje = "Las contraseñas no coinciden"
                    vm.shMensaje = true
                    return false;
                }
                return true;
            }else{
                vm.mensaje = "Debes llenar todos los campos"
                vm.shMensaje = true
                return false;
            }
        }
        function cargarDatos(op){
            switch(op){
                case 'bUsuario':
                    //traer lista usuarios
                    listaUsuarios()
                break;
                case 'reportes':
                    //traer grupos de la orientadora
                    //traer areas (checar si es catalogo o debe ser en el html)
                break;
                case 'ecuenta':
                    //Obtener datos de usuario loggeado
                    $scope.enombre = localStorage.getItem("user");
                break;
                case 'goToInicio':
                    location.href = " ../vistas/index.html"
                break;
            }
        }
        function listaUsuarios(){
            vm.listaUsuarios = [];
            var lu = admonServ.obtU(localStorage.getItem("id"));
            if(lu == null){
                $scope.mensaje = utilsServ.shModal("No se pudo obtener la lista de usuarios, revisa tu conexión\n"+
                "o contacta a tu administrador");
                utilsServ.setSHModal(false);
                return null;  
            }
            var us = lu.split("|");
            var y = 0;
            for (var i = 0; i < us.length -1 ; i++) {
                y = i+1;
                vm.listaUsuarios.push({"id":us[i],"nombre":us[y]})
                i =y;
            }
             utilsServ.setSHModal(false);
        }
    }
})();