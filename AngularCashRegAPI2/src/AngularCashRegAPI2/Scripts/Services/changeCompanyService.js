(function () {
    'use strict';

    angular
        .module('heroesApp')
        .factory('changeCompanyService', changeCompanyService);

    changeCompanyService.$inject = ['$http'];

    function changeCompanyService($http) {
        var newCompanyName = 'Foo Company';
        var newCompanyCity = 'Philadelphia';
        var newCompanyPhone = '609-509-6101';
    
        return {
            getCompany: function() {
                return newCompanyName;
            },
            setCompany: function(value) {
                newCompanyName = value;
            },
            getCompanyCity: function() {
                return newCompanyCity;
            },
            setCompanyCity: function(value) {
                newCompanyCity = value;
            },
            getCompanyPhone: function() {
                return newCompanyPhone;
            },
            setCompanyPhone: function(value) {
                newCompanyPhone = value;
            }
        }
    }
})();