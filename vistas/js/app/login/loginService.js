(function(){
'use strict'
angular.module('mooniart.ubikt').service('loginServ', loginServ);
loginServ.$inject=['$http','$q','$httpParamSerializerJQLike'];
function loginServ($http,$q,$httpParamSerializerJQLike){
    var service = this; 
    var url = ""
    console.log("Login Service")
    function validaDatos(users,pwd){
       var dev ;
        $.ajax({
                    type: 'post',
                    data: {"user": users , "contraseña":pwd},
                    url: '../controlador/login.php',
                    async: false
        }).done(function(data){
                    dev = data;
        });
        return dev;
    }
    function exito(res){ console.log('RES: ', res); return res.data; }
    function error(err){ console.log(err); return $q.reject(err.data.descripcionError); } 
    return{
        validaDatos : validaDatos,
    };
}
})()