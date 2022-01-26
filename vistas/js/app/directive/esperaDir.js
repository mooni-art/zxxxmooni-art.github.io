(function(){
'use strict'
	angular.module('mooniart.ubikt').directive('modalLapse', [function () {
		return {
			restrict: 'EA',
			scope:{
				mostrar:'=?'
			},
			template: "<div class='modal fade' id='modal-lapse' tabindex='-1' data-backdrop='static' data-keyboard='false' role='dialog' style='display: none;'>"+
  	"<div class='modal-dialog modal-dialog-centered' role='document' style='height: auto;'>"+
    "<div class='container' style='height: 100%;'>"+
    "<div class='row' ><div class='col-12' style='text-align: center; align-content: center;' >"+
  	"<span><img class='spiner mr-4' src='./img/lunaAzul.png' style='height: 50px;width : 50px;'></span>"+
    "<span><img src='./img/logomooniaart.png' style='width : 150px;'></span></div></div></div></div></div>"
		};
	}]);
})();

