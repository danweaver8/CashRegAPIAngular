(function () {
    'use strict';

    var productService = angular.module('productService', ['ngResource']);
    productService.factory('Clothing', ['$resource',
        function ($resource) {
            return $resource('/api/Clothing', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });
        }
    ]);
    productService.factory('Electronic', ['$resource',
        function ($resource) {
            return $resource('/api/Electronic', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });
        }
    ]);
    productService.factory('Kitchen', ['$resource',
       function ($resource) {
           return $resource('/api/Kitchen', {}, {
               query: { method: 'GET', params: {}, isArray: true }
           });
       }
    ]);
    productService.factory('Grocery', ['$resource',
       function ($resource) {
           return $resource('/api/Grocery', {}, {
               query: { method: 'GET', params: {}, isArray: true }
           });
       }
    ]);
})();