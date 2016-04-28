(function () {
    'use strict';

    var stateService = angular.module('stateService', ['ngResource']);
    stateService.factory('States', ['$resource',
        function ($resource) {
            return $resource('/api/State', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });
        }
    ]);
})();