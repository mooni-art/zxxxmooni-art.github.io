(function(){
    'use strict'
    angular.module('mooniart.ubikt').controller('ubiktCtrl', ubiktCtrl);
    ubiktCtrl.$inject = ['$scope','$timeout'];
    function ubiktCtrl($scope, $timeout){
        var vm = this;
        vm.selection = "alumno"
        vm.ligaAlumno = "alumno"
        console.log("ubikt")
    }
})();