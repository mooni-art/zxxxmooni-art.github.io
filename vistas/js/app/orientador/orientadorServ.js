(function(){
'use strict'
angular.module('mooniart.ubikt').service('orientadorServ', orientadorServ);
orientadorServ.$inject=['$http','$q','$httpParamSerializerJQLike','utilsServ'];
function orientadorServ($http,$q,$httpParamSerializerJQLike,utilsServ){
    var service = this; 
    var url = ""
    console.log("Orientador Service")
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
        function estaGrupo(nombre,idUs){
            var dev;
            $.ajax({
                type: 'post',
                data: {"nomg": nombre,"idus":idUs},
                url: '../modelos/estaGrupo.php',
                async: false
            })
            .done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
        function guardaGrupo(nombre,idori){
            var dev;
            $.ajax({
                type: 'post',
                data: {"nomg": nombre,"idOri":idori},
                url: '../modelos/guardaGrupo.php',
                async: false
            })
            .done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
        function guardaAlumno(nombre,ap,am,sexo){
        }
        function buscaAlumno(nombre,ap,am,sexo,grupo){
            var dev;
            $.ajax({
                type: 'post',
                data: {"nombre": nombre, "ap" : ap , "am" : am , "sexo" : sexo, "grupo" : grupo},
                url: '../modelos/bAlumno.php',
                async: false
            })
            .done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
        function buscaAlumnoID(id){
            var dev;
            $.ajax({
                type: 'post',
                data: {"id": id},
                url: '../modelos/bAlumnoID.php',
                async: false
            })
            .done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
        function registraAlumno(nombre,ap,am,sexo,grupo,carrera,clave){
            var dev;
            $.ajax({
                type: 'post',
                data: {"nombre": nombre, "ap" : ap , "am" : am , "sexo" : sexo, "grupo" : grupo, "carrera" : carrera,"clave": clave},
                url: '../modelos/Ralumno.php',
                async: false
            })
            .done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
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
            })
            .fail(function(){
                dev = null
            });
            return (dev);
        }
        function traeG(idOri){
            var dev;
            $.ajax({
                type: 'post',
                data: {'idori': idOri},
                url:  "../modelos/listaGruposOri.php",
                async: false
            })
            .done(function(data){
                dev = data;
            })
            .fail(function(){
                dev = null
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
            })
            .fail(function(){
                dev = null
            });
            return (dev);
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
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
        function getsHacerEvaluacion(idfuncion,idarea,idalumno,question,contador,percentil){
            var dev;
            $.ajax({
                type: 'post',
                data: {"funcion": idfuncion,"idArea":idarea,"idAlumno":idalumno,
                "question":question,"contador":contador,"percentil":percentil},
                url: '../modelos/hacerEvaluacion_new.php',
                async: false
            })
            .done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
        function traerEvaluacion(idal,idarea){
            var dev;
            $.ajax({
                type: 'post',
                data: {"idg": idal,"idarea":idarea},
                url: '../modelos/traeEval.php',
                async: false
            })
            .done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
            });
            return (dev);
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
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
        function traeAreas(){
            var dev;
            $.ajax({
                type: 'post',
                data: {},
                url:  "../modelos/listaAreas.php",
                async: false
            })
            .done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
            });
            return (dev);
        }
        function traerEvaluacionGA(idtipo,id){
            var dev;
            $.ajax({
                type: 'post',
                data: {"tipo": idtipo,"id":id},
                url: '../modelos/traeEvalGA.php',
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
        cerrarSesion: cerrarSesion,
        estaGrupo: estaGrupo,
        guardaGrupo: guardaGrupo,
        buscaAlumno: buscaAlumno,
        buscaAlumnoID: buscaAlumnoID,
        registraAlumno: registraAlumno,
        alsDgrupo: alsDgrupo,
        traeG: traeG,
        estaEvaluado: estaEvaluado,
        ultRespuesta: ultRespuesta,
        traerEvaluacion: traerEvaluacion,
        carreraInteres: carreraInteres,
        traeAreas: traeAreas,
        traerEvaluacionGA: traerEvaluacionGA
    };
}
})()