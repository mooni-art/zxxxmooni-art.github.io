(function(){

'use strict'
angular.module('mooniart.ubikt').service('testServ', testServ);

testServ.$inject=['$http','$q','$httpParamSerializerJQLike'];
function testServ($http,$q,$httpParamSerializerJQLike){
    var service = this; 
    var url = ""
    console.log("Test Service")
    function getGrupoAlumno(idal){
      var dev;
      $.ajax({
            type: 'post',
            data: {"ida": idal},
            url: '../modelos/getGrupoAlumno.php',
            async: false
      })
      .done(function(data){
            dev = data;
      }).fail(function(){
                dev = null
            });;
      return (dev);
    }
    function getListaPreguntas(){
      var dev;
      $.ajax({
            type: 'post',
            data: {},
            url: '../modelos/listaPreguntas.php',
            async: false
      })
      .done(function(data){
            dev = data;
      }).fail(function(){
                dev = null
            });;
      return (dev);
    }
    function getListaRespuestas(idal){
      var dev;
      $.ajax({
            type: 'post',
            data: {"ida": idal},
            url: '../modelos/respuestas.php',
            async: false
      })
      .done(function(data){
            dev = data;
      }).fail(function(){
                dev = null
            });;
      return (dev);
    }
    function ultPregRespondida(idal){
      var dev;
      $.ajax({
            type: 'post',
            data: {"idAl": idal},
            url: '../modelos/ultPregResAl.php',
            async: false
      })
      .done(function(data){
            dev = data;
      }).fail(function(){
                dev = null
            });;
      return (dev);
    }
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
    function guardaCarrera(idal,carrer){
      var dev;
      $.ajax({
            type: 'post',
            data: {"idal": idal , "carrera": carrer},
            url: '../modelos/actualizaCarreraAlumno.php',
            async: false
      })
      .done(function(data){
            dev = data;
      }).fail(function(){
                dev = null
            });;
      return (dev);
    }
    return{
        // buscaAlumno: buscaAlumno,
        getListaPreguntas: getListaPreguntas,
        getListaRespuestas: getListaRespuestas,
        ultPregRespondida: ultPregRespondida,
        registraRespuesta: registraRespuesta,
        getGrupoAlumno: getGrupoAlumno,
        guardaCarrera: guardaCarrera 
    };
}

})()
