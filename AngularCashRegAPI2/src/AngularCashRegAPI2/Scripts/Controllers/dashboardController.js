(function () {
    'use strict';

    angular.module('heroesApp')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['cashRegisterService'];

    function dashboardController(cashRegisterService) {
        var vm = this;
        vm.currencySymbol = cashRegisterService.currency.symbol;
        //Set a selected category
        //vm.categorySelected = vm.categoryList[0];
        //functions
        vm.addItem = scanProduct;
        vm.applyEmpDiscount = applyEmpDiscount;
        vm.getProducts = getProducts;
        vm.reqQuantity = quantityCheck;
        vm.productCheck = productCheck;
        vm.voidLastTxn = cashRegisterService.voidLastTransaction;
        vm.removeItem = removeItem;
        vm.cancelSale = voidAllTrans;
        vm.EmployeeSelectCheck = checkEmployee;
        vm.removeDiscountItem = removeEmployeeDiscount;
        vm.applyStateTax = applyStateTax;
        vm.SetCompanyInfo = cashRegisterService.SetCompanyInfo;

        //Run
        initDashboard();

        function initDashboard() {
            cashRegisterService.init();
            vm.expirationDate = cashRegisterService.expirationDate;
            vm.totalCost = cashRegisterService.totalCost;
            vm.subTotalCost = cashRegisterService.subTotalCost;
            //gets the list of products from the json file
            vm.categoryList = cashRegisterService.categoryList;
            vm.stateTaxTotal = cashRegisterService.stateTaxTotal;
            //gets the list of employees from the json file.
            var EmployeeL = cashRegisterService.getEmployees();
            EmployeeL.then(function (result) {
                // this is only run after getData() resolves
                vm.employeeList = result;
            });

            //Get list of states
            var stateL = cashRegisterService.getStates();
            stateL.then(function (result) {
                vm.stateList = result;
            });

            vm.productSelectedName = "";
            vm.companyCity = cashRegisterService.companyCity;
            vm.companyName = cashRegisterService.companyName;
            vm.companyPhone = cashRegisterService.companyPhone;
            vm.scannedItems = cashRegisterService.scannedItems;
            vm.discountApplied = cashRegisterService.employeeDiscountList;
        }

        //Gets the products based off of the category selected
        function getProducts() {
            vm.productList = [];
            var productL = cashRegisterService.getProducts(vm.categorySelected);
            productL.then(function (result) {
                // this is only run after getData() resolves
                vm.productList = result;
            });
        }

        function scanProduct() {
            var quantity = parseFloat(vm.productQuantity);
            if (vm.productSelected && angular.isNumber(quantity)) // If valid product and quantity is a number?
            {
                cashRegisterService.scan(vm.productSelected, quantity); // Now scan
            }
            vm.totalCost = cashRegisterService.totalCost;
            vm.subTotalCost = cashRegisterService.subTotalCost;
        }

        function applyStateTax() {
            var stateTax = parseFloat(vm.stateSelected.tax);
            if (vm.stateSelected.tax && angular.isNumber(stateTax)) {
                cashRegisterService.applyStateTax(stateTax);
            }
            vm.totalCost = cashRegisterService.totalCost;
            vm.stateTaxTotal = cashRegisterService.stateTaxTotal;
        }

        function removeItem(item) {
            cashRegisterService.voidItem(item.product, item.cost, item.quantity);
            vm.totalCost = cashRegisterService.totalCost;
            vm.subTotalCost = cashRegisterService.subTotalCost;
            vm.scannedItems = cashRegisterService.scannedItems;
        }

        function voidAllTrans() {
            cashRegisterService.voidAllTransactions();
            vm.totalCost = cashRegisterService.totalCost;
            vm.scannedItems = cashRegisterService.scannedItems;
        }

        function applyEmpDiscount() {
            cashRegisterService.applyEmployeeDiscount(vm.employeeSelected);
            vm.totalCost = cashRegisterService.totalCost;
        }
        function removeEmployeeDiscount() {
            cashRegisterService.removeDiscountItem();
            vm.totalCost = cashRegisterService.totalCost;
            vm.discountApplied = cashRegisterService.employeeDiscountList;
        }

        //Validations
        function productCheck() {
            if (vm.productSelected === undefined || vm.productSelected == '') return true;
            return false;
        }
        function quantityCheck() {
            if (vm.productQuantity === undefined || vm.productQuantity == '') return true;
            return false;
        }
        function checkEmployee() {
            if (vm.employeeSelected === undefined || vm.employeeSelected == '') return true;
            return false;
        }
    }
})();
