(function(){
    'use strict'
    angular.module('mooniart.ubikt').controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$scope','$timeout','loginServ','utilsServ'];
    function loginCtrl($scope, $timeout,loginServ,utilsServ){
        var vm = this;
         utilsServ.setSHModal(false);
        vm.utilsServ = utilsServ;
        vm.shMensaje = false;
        vm.ingresa = ingresa;
        function ingreaPrueba(){
            localStorage.setItem('user', "asfasf");
                    localStorage.setItem('rol',"ori") 
                     window.location.href =" ../vistas/orientador.html"
        }
        function ingresa(){
            if($scope.usuario == undefined || $scope.pwd == undefined){//no vacios
                vm.mensaje = "Datos incorrectos";
                vm.shMensaje = true;
            }else{
                var dev ;
                     dev = loginServ.validaDatos($scope.usuario,$scope.pwd);
                     console.log(dev)
                     if(dev == "false"){
                        vm.mensaje = "Datos incorrectos";
                        vm.shMensaje = true;
                    }else{
                        localStorage.setItem('user', $scope.usuario);
                        localStorage.setItem('rol',dev)
                        if(dev == "admin"){
                            window.location =" ../vistas/admin.html"
                        }else if(dev == "ori"){
                            window.location =" ../vistas/orientador.html"
                        }
                }
                // }, 2000);
            }
        }
        console.log("login")
    }
})();


