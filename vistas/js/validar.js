
$(document).ready(function(){
	$('#login').validate({
		rules:{
			user:{
				required: true
			},
			contraseña: {
				required: true
			}
		},
		messages:{
			user:{
				required: "Campo obligatorio"
			},
			contraseña:{
				required: "Este campo no puede estar vacio"
			}
		}
	});
});