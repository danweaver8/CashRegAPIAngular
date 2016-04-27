(function () {
    'use strict';

    angular
        .module('heroesApp')
        .controller('modalcontroller', modalcontroller);

    modalcontroller.$inject = ['$scope']; 

    function modalcontroller($scope) {
        $scope.showModal = false;
        $scope.toggleModal = function () {
            $scope.showModal = !$scope.showModal;
        };
    }
})();
