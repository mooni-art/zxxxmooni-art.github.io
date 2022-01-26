$(document).ready(function(){
 		 var xhttp; 
 		 xhttp = new XMLHttpRequest();
 		 xhttp.onreadystatechange = function() {
    			if (this.readyState == 4 && this.status == 200) {
    				var x = this.responseText;
    				if(x == 0){
    					alert("NO hay grupos guardados en la Base de Datos, avisale a tu orientador");
    					location.href = "index.html";
    				}else{
    					document.getElementById("selector").innerHTML = x;
    				}
    				
    			}
  		 };
  		xhttp.open("GET", "../modelos/listaGrupos.php", true);
  		xhttp.send();
});