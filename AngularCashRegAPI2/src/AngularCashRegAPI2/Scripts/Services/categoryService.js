(function () {
    'use strict';

    var heroesService = angular.module('categoryService', ['ngResource']);
    heroesService.factory('Category', ['$resource',
        function ($resource) {
            return $resource('/api/Category', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });
        }
    ]);

    heroesService.factory('Employees', ['$resource',
        function ($resource) {
            return $resource('/api/Employee', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });
        }
    ]);
})();