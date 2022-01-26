(function(){
'use strict'
angular.module('mooniart.ubikt').service('utilsServ', utilsServ);
utilsServ.$inject=['$http','$q','$httpParamSerializerJQLike'];
function utilsServ($http,$q,$httpParamSerializerJQLike){
    var service = this; 
    var url = ""
    console.log("Utils Service")
     function shModal(mensaje){
        $('#modalInformacion').modal('show');  
        return mensaje;
     } 
     function inicio(){
        if(localStorage.getItem("user") == undefined){
            return null
        }else{
                localStorage.setItem('id',estaUsuario(localStorage.getItem("user")))
        }
        console.log('Inicio',localStorage.getItem('user'))
        return true
     }
    function salir(){
        localStorage.removeItem("user");
        localStorage.removeItem("rol")
        location.href = " ../vistas/index.html"
    }
    function numerico(texto){
            if(texto==""){
               return false;
            }
            if(texto.length!=3){
                return false;
            }
            for(var  i=0;i < texto.length;i++){
                if(isNaN(texto[i])){
                    return false;
                }
            }
            return true;
    }
    function accion(ac){
            switch(ac){
                case 'salir':
                    salir()
                break;
            }
    }
    function setshMenu(bol){
        if(bol == null){
            if(getshMenu()){
                setshMenu(false)
                $("#btnMenu1").hide();
            }else{
                setshMenu(true)
                $("#btnMenu1").show();
            }
        }else{
            service.menu = bol;
        }
    }
    function getshMenu(){
        return service.menu;
    }
    function resize(){
       console.log($(window).width())
        if($(window).width() >= 1000){//grande
              setshMenu(true)
              $("#btnMenu1").show();
            if(localStorage.getItem('rol')=='orientador'){
                if(getOpcMenu() == 'grafica'){
                    $(".tablilla").show();
                }else{
                    $(".tablilla").hide();  
                }
            }
        }else{
            setshMenu(false)
            $("#btnMenu1").hide(); 
        }   
    }
    function setOpcMenu(opc,ctrll){
        service.opcMenu = opc;
        ctrll.cargarDatos(opc)
    } 
    function getOpcMenu(){
        return service.opcMenu;
    }
    function validaDatos(nombre,pssact,pss,pss1){
            var mensaje = ""
            if(nombre != undefined && pssact != undefined && pss != undefined && pss1 != undefined){
                if(nombre.length > 10 || nombre.length < 4){
                    mensaje = "El nombre es invalido\nEl nombre de usuario debe tener entre 4 y 10 caracteres";
                    return mensaje;
                }
                if(pss.length > 15 || pss.length < 6){
                    console.log(pss.length)
                    mensaje = "La contraseña debe tener al menos 6 caracteres (Maximo 15)";
                    return mensaje;
                }
                if(pss1.length == 0 || pss.length < 6){
                    mensaje = "La contraseña nueva debe tener almenos 6 caracteres";
                    return mensaje;
                }
                if(pss != pss1){
                    mensaje = "Las contraseñas no coinciden";
                    return mensaje;
                }
                return true;
            }else{
                mensaje = "Todos los campos son obligatorios";
                return mensaje;
            }
    }
    function checaPassword(nombre,pss){
            var dev;
            $.ajax({
                type: 'post',
                data: {"user": nombre, "contraseña": pss},
                url: '../controlador/userPassw.php',
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
    function actualizaUsuario(nombre,pss,id){
            var dev;
            $.ajax({
                type: 'post',
                data: {"nombreUser": nombre, "passw": pss, "idu": id},
                url: '../modelos/actualizaUsuario.php',
                async: false
            })
            .done(function(data){
                dev = data;
            }).fail(function(){
                dev = null
            });
            return (dev);
    }
    function editarCuenta(enombre,epss,epssnew,epssnew1){
        var mensaje = ""
        console.log(localStorage.getItem('id'))
        mensaje = validaDatos(enombre,epss,epssnew,epssnew1)
        if(mensaje == true){
                //Checar la contraseña del usuario primero
                if(checaPassword(enombre,epss) == "true"){
                    var nameAct = localStorage.getItem('user');
                    if(estaUsuario(enombre) != 0 && enombre != nameAct){
                        //ya esta registrado
                        mensaje = "¡Este usuario ya está registrado!\nNo se guardó";
                    }else{
                        //no esta registrado
                        var ok = actualizaUsuario(enombre,epssnew,localStorage.getItem('id'));
                        console.log(ok)
                        if(ok == 1){
                            mensaje = "Usuario actualizado exitosamente";
                            localStorage.setItem('user',enombre)
                        }else{
                            mensaje = "No se pudo actualizar usuario";
                        }
                    }
                }else{
                    mensaje = "La contraseña actual no coincide";
                }
        }
        return mensaje;
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
            }).fail(function(){
                dev = null
            });
            return (dev);
    }
    function setSHModal(bol){
        service.modal = bol;
        mostrarOcultar()
    } 
    function getSHModal(){
        return service.modal;
    }
    function mostrarOcultar(){
        if(service.modal == true){
            $('#modal-lapse').modal('show');
        }else{
            setTimeout(function(){
               $('#modal-lapse').modal('hide');        
            },200)
        }
    }
    function buscaAlumno(clave){
      var dev;
      $.ajax({
            type: 'post',
            data: {"clave": clave},
            url: '../modelos/alumno.php',
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
        shModal: shModal,
        inicio: inicio,
        salir: salir,
        numerico: numerico,
        accion: accion,
        getshMenu: getshMenu,
        setshMenu: setshMenu,
        resize: resize,
        setOpcMenu: setOpcMenu,
        getOpcMenu: getOpcMenu,
        validaDatos: validaDatos,
        checaPassword: checaPassword,
        estaUsuario: estaUsuario,
        actualizaUsuario: actualizaUsuario,
        editarCuenta: editarCuenta,
        estaGrupo: estaGrupo,
        hacerEvaluacion: hacerEvaluacion,
        setSHModal: setSHModal,
        getSHModal: getSHModal,
        buscaAlumno: buscaAlumno
    };
}
})()
