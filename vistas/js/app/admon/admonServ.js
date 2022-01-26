(function(){
'use strict'
angular.module('mooniart.ubikt').service('admonServ', admonServ);
admonServ.$inject=['$http','$q','$httpParamSerializerJQLike'];
function admonServ($http,$q,$httpParamSerializerJQLike){
    var service = this; 
    var url = ""
    console.log("Admon Service")
    function estaLogeado(){
            var dev;
            $.ajax({
                type: 'post',
                data: {"cooki": "usuario"},
                url: '../controlador/iniciaSesion.php',
                async: false
            }).done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
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
            }).fail(function(){
                dev = null
            });
            console.log('rolUsuarioCookie',dev)
            return (dev);
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
            }).fail(function(){
                dev = null
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
            }).fail(function(){
                dev = null
            });
            return (dev);
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
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
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
            }).fail(function(){
                dev = null
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
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
    return{
        estaLogeado : estaLogeado,
        rolUsuarioCookie: rolUsuarioCookie,
        guardaUsuario: guardaUsuario,
        estaUsuario: estaUsuario,
        obtU: obtU,
        bajausuario: bajausuario,
        cerrarSesion: cerrarSesion
    };
}
})()
