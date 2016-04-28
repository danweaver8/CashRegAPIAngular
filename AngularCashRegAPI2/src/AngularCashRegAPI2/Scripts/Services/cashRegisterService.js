(function () {
    'use strict';

    angular
        .module('heroesApp')
        .factory('cashRegisterService', cashRegisterService);

    cashRegisterService.$inject = ["$q", "$http", "changeCompanyService", "Category", "States", "Clothing", "Electronic", "Kitchen", "Grocery", "Employees"];
    //cashRegisterService.$inject = ["$q", "$http"];

    function cashRegisterService($q, $http, changeCompanyService, Category, States, Clothing, Electronic, Kitchen, Grocery, Employees) {
        var scannedItems;
        var totalCost = 0.00;
        var subTotalCost = 0.00;
        var stateTaxPecentage = 1;
        var employeeDiscount = 1;
        var stateTaxTotal = 0.00;
        var currency = {
            name: 'BBD',
            symbol: '$',
            rate: 1.98
        };
        var idGenerator = 0;
        var productList = [];
        var employeeList = [];
        var stateList = States.query();
        var categoryList = Category.query();//['Kitchen', 'Electronic', 'Grocery', 'Clothing'];
        var employeeDiscountList = [];
        var discountProduct;
        var EMP_DISCOUNT_PRODUCT_CODE;
        var expirationDate;
        var companyName;
        var companyCity;
        var companyPhone;

        EMP_DISCOUNT_PRODUCT_CODE = '9999';

        discountProduct = {
            code: EMP_DISCOUNT_PRODUCT_CODE,
            percentDiscount: 0,
            name: 'Employee Discount'
        };

        //Gets all the products from the JSON files
        function getProducts(category) {
            switch (category.Name) {
                case 'Kitchen':
                    var deferred = $q.defer();
                    Kitchen.query().$promise.then(function (data) {
                        // success handler
                        productList = data;
                        deferred.resolve(data);
                    }, function (error) {
                        // error handler
                        deferred.reject(data);
                    });
                    return deferred.promise;
                    break;
                case 'Electronic':
                    var deferred = $q.defer();
                    Electronic.query().$promise.then(function (data) {
                        // success handler
                        productList = data;
                        deferred.resolve(data);
                    }, function (error) {
                        // error handler
                        deferred.reject(data);
                    });
                    return deferred.promise;
                    break;
                case 'Grocery':
                    var deferred = $q.defer();
                    Grocery.query().$promise.then(function (data) {
                        // success handler
                        productList = data;
                        deferred.resolve(data);
                    }, function (error) {
                        // error handler
                        deferred.reject(data);
                    });
                    return deferred.promise;
                    break;
                case 'Clothing':
                    var deferred = $q.defer();
                    Clothing.query().$promise.then(function(data) {
                        // success handler
                        productList = data;
                        deferred.resolve(data);
                    }, function(error) {
                        // error handler
                        deferred.reject(data);
                    });
                    return deferred.promise;
                    break;
                default:
                    break;
            }
        }


        //Gets the employees from the JSON file
        function getEmployees() {
            var deferred = $q.defer();
            Employees.query().$promise.then(function (data) {
                // success handler
                productList = data;
                deferred.resolve(data);
            }, function (error) {
                // error handler
                deferred.reject(data);
            });
            return deferred.promise;
        };

        //Initializes the service given to the controller
        var service = {
            init: init,
            scan: scan,
            voidItem: voidItem,
            voidLastTransaction: voidLastTransaction,
            voidAllTransactions: voidAllTransactions,
            applyEmployeeDiscount: applyEmployeeDiscount,
            employeeDiscountList: employeeDiscountList,
            categoryList: categoryList,
            productList: productList,
            employeeList: employeeList,
            stateList: stateList,
            currency: currency,
            totalCost: totalCost,
            subTotalCost: subTotalCost,
            scannedItems: scannedItems,
            getProducts: getProducts,
            getEmployees: getEmployees,
            removeDiscountItem: removeDiscountItem,
            expirationDate: expirationDate,
            companyCity: companyCity,
            companyName: companyName,
            companyPhone: companyPhone,
            applyStateTax: applyStateTax,
            stateTaxPecentage: stateTaxPecentage,
            employeeDiscount: employeeDiscount,
            SetCompanyInfo: SetCompanyInfo
        };
        return service;

        function init() {
            this.scannedItems = [];
            this.totalCost = 0.00;
            this.idGenerator = 0;
            this.expirationDate = formatExpirationDate();
            this.companyName = changeCompanyService.getCompany();
            this.companyCity = changeCompanyService.getCompanyCity();
            this.companyPhone = changeCompanyService.getCompanyPhone();
        }

        function formatExpirationDate() {
            var expire = new Date();
            var numberOfDaysToAdd = 45;
            expire.setDate(expire.getDate() + numberOfDaysToAdd);
            var dd = expire.getDate();
            var mm = expire.getMonth() + 1;
            var y = expire.getFullYear();

            var expireReturn = mm + '/' + dd + '/' + y;
            return expireReturn;
        }

        //Add item to receipt
        function scan(product, quantity) {
            this.idGenerator++;
            var newproduct = jQuery.extend(true, {}, product);
            newproduct.code += this.idGenerator;
            this.scannedItems.push({
                id: this.idGenerator,
                product: newproduct,
                quantity: quantity,
                cost: newproduct.price * quantity
            }); //Behaves as a stack
            this.totalCost += calculateProductCost(newproduct, quantity); //Add cost to total
            this.subTotalCost = calculateTotal(this.scannedItems);
        }

        function calculateProductCost(product, quantity) {
            return product.price * quantity;
        }

        //Remove all transactions
        function voidAllTransactions() {
            this.scannedItems = [];
            this.totalCost = 0.00;
            this.idGenerator = 0;
        }
        //Remove most recent item
        function voidLastTransaction() {
            if (this.scannedItems.length === 0) return false; //empty stack
            var item = this.scannedItems.pop();

            if (item.product.code === EMP_DISCOUNT_PRODUCT_CODE) {
                this.totalCost *= (100 + item.product.price) / 100;
            } else {
                this.totalCost -= item.cost;
            }
            return true;
        }

        //Remove Specific item
        function voidItem(item, cost, quantity) {
            for (var i = 0; i < this.scannedItems.length; i++)
                if (this.scannedItems[i].product.code === item.code) {
                    this.scannedItems.splice(i, 1);
                    this.totalCost -= cost * quantity;
                    break;
                }
            this.subTotalCost = calculateTotal(this.scannedItems);
        }

        function removeDiscountItem() {
            this.employeeDiscountList = [];
            this.totalCost = calculateTotal(this.scannedItems);
            if (this.stateTaxPecentage > 1) {
                this.totalCost = ((this.stateTaxPecentage / 100) + 1) * this.totalCost;
            }
            this.employeeDiscount = 1;
        }

        function applyEmployeeDiscount(employee) {
            //this.idGenerator++;
            if (this.employeeDiscountList.length == 0) {
                var employeeDiscountProduct = angular.copy(discountProduct); //Shallow copy
                employeeDiscountProduct.percentDiscount = employee.discount;
                employeeDiscountProduct.name = employee.name;
                this.employeeDiscount = employee.discount;
                this.employeeDiscountList.push(employeeDiscountProduct);
                this.totalCost = calculateTotal(this.scannedItems) * ((100 - employee.discount) / 100);
                if (this.stateTaxPecentage > 1) {
                    this.totalCost = ((this.stateTaxPecentage / 100) + 1) * this.totalCost;
                }
            } else {
                alert("Only 1 discount can be applied to a transaction.");
            }

        }

        function applyStateTax(tax) {
            this.stateTaxPecentage = tax;
            this.totalCost = ((tax / 100) + 1) * calculateTotal(this.scannedItems);
            this.stateTaxTotal = this.subTotalCost * ((tax / 100));
            if (this.employeeDiscount > 1) {
                this.totalCost = this.totalCost * ((100 - this.employeeDiscount) / 100);
            }
        }

        function calculateTotal(scannedItems) {
            //Loop through scannedItems to calculate total cost
            var total = 0;
            angular.forEach(scannedItems, function (item) {
                if (item.product.code !== EMP_DISCOUNT_PRODUCT_CODE) {
                    total += item.cost;
                }
            });
            return total;
        }

        function itemLookup(data, code) {
            var item = null;
            angular.forEach(data, function (value) {
                if (code === value.code) {
                    item = value;
                    return false; // break out of loop when we find item
                }
            });
            return item;
        }

        function SetCompanyInfo(companyName, companyCity, companyPhone) {
            this.companyName = companyName;
            changeCompanyService.setCompany(companyName);
            this.companyCity = companyCity;
            changeCompanyService.setCompanyCity(companyCity);
            this.companyPhone = companyPhone;
            changeCompanyService.setCompanyPhone(companyPhone);
        }
    }
})();