 angular.module('cashRegisterApp', ['ngAnimate']);
  
 
(function() {
  'use strict';
 angular.module('cashRegisterApp')
    .controller('DashBoardController', DashBoardController)
    .factory('cashRegisterService', cashRegisterService);


  function DashBoardController(cashRegisterService) {
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
      EmployeeL.then(function(result) {  
        // this is only run after getData() resolves
        vm.employeeList = result;
      });
      
      //Get list of states
      var stateL = cashRegisterService.getStates();
      stateL.then(function(result) {  
        vm.stateList = result;
      });
      
      vm.companyCity = cashRegisterService.companyCity;
      vm.companyName = cashRegisterService.companyName;
      vm.companyPhone = cashRegisterService.companyPhone;
      vm.scannedItems = cashRegisterService.scannedItems;
      vm.discountApplied = cashRegisterService.employeeDiscountList;
    }
    
    //Gets the products based off of the category selected
    function getProducts()
    {
        vm.productList=[];
        var productL = cashRegisterService.getProducts(vm.categorySelected);
       productL.then(function(result) {  
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
    
    function applyStateTax()
    {
        var stateTax = parseFloat(vm.stateSelected.tax);
        if(vm.stateSelected.tax && angular.isNumber(stateTax))
        {
            cashRegisterService.applyStateTax(stateTax);
        }
        vm.totalCost = cashRegisterService.totalCost;
        vm.stateTaxTotal = cashRegisterService.stateTaxTotal;
    }
    
    function removeItem(item)
    {
        cashRegisterService.voidItem(item.product, item.cost, item.quantity);
        vm.totalCost = cashRegisterService.totalCost;
        vm.subTotalCost = cashRegisterService.subTotalCost;
         vm.scannedItems = cashRegisterService.scannedItems;
    }
    
    function voidAllTrans()
    {
        cashRegisterService.voidAllTransactions();
        vm.totalCost = cashRegisterService.totalCost;
        vm.scannedItems = cashRegisterService.scannedItems;
    }

    function applyEmpDiscount() {
      cashRegisterService.applyEmployeeDiscount(vm.employeeSelected);
      vm.totalCost = cashRegisterService.totalCost;
    }
    function removeEmployeeDiscount()
    {
        cashRegisterService.removeDiscountItem();
        vm.totalCost = cashRegisterService.totalCost;
        vm.discountApplied = cashRegisterService.employeeDiscountList;
    }
    
    //Validations
    function productCheck() {
        if (vm.productSelected === undefined || vm.productSelected== '') return true;
        return false;
    }
    function quantityCheck() {
        if (vm.productQuantity === undefined || vm.productQuantity== '') return true;
        return false;
    }
    function checkEmployee() {
        if (vm.employeeSelected === undefined || vm.employeeSelected == '') return true;
        return false;
    }
    
  }

  //cashRegisterService.$inject[];
  function cashRegisterService($q, $http, sharedProperties) {
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
    var productList=[];
    var employeeList=[];
    var stateList=[];
    var categoryList=['Kitchen', 'Electronic', 'Grocery', 'Clothing'];
    var employeeDiscountList=[];
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
       switch (category) {
           case 'Kitchen':
                 var deferred = $q.defer();
                 $http.get('json/Kitchen.json')
                 .success(function (data) {
                    productList = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
               break;
           case 'Electronic':
                var deferred = $q.defer();
                $http.get('json/Electronic.json')
                .success(function (data) {
                    productList = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
                break;
           case 'Grocery':
                var deferred = $q.defer();
                $http.get('json/Products.json')
                .success(function (data) {
                    productList = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
                break;
           case 'Clothing':
                var deferred = $q.defer();
                $http.get('json/Clothing.json')
                .success(function (data) {
                    productList = data;
                    deferred.resolve(data);
                })
                .error(function (data) {
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
       $http.get('json/Employees.json')
        .success(function (data) {
          employeeList = data;
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject(data);
        });
      return deferred.promise;
    };
    
    //Gets the states and taxes
    function getStates()
    {
        var deferred = $q.defer();
       $http.get('json/States.json')
        .success(function (data) {
          stateList = data;
          deferred.resolve(data);
        })
        .error(function (data) {
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
      getStates: getStates,
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
      this.companyName=sharedProperties.getCompany();
      this.companyCity=sharedProperties.getCompanyCity();
      this.companyPhone=sharedProperties.getCompanyPhone();
    }
    
    function formatExpirationDate()
    {
        var expire = new Date();
      var numberOfDaysToAdd = 45;
      expire.setDate(expire.getDate() + numberOfDaysToAdd);
        var dd = expire.getDate();
        var mm = expire.getMonth() + 1;
        var y = expire.getFullYear();

        var expireReturn = mm + '/'+ dd + '/'+ y;
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
    function voidAllTransactions()
    {
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
    function voidItem(item, cost, quantity)
    {
        for (var i = 0; i < this.scannedItems.length; i++)
            if (this.scannedItems[i].product.code === item.code) { 
                this.scannedItems.splice(i, 1);
                this.totalCost -= cost*quantity;
                break;
        }
        this.subTotalCost = calculateTotal(this.scannedItems);
    }
    
    function removeDiscountItem()
    {
        this.employeeDiscountList=[];
        this.totalCost = calculateTotal(this.scannedItems);
        if(this.stateTaxPecentage>1)
            {
                  this.totalCost = ((this.stateTaxPecentage/100)+1)*this.totalCost;
            }
        this.employeeDiscount = 1;
    }

    function applyEmployeeDiscount(employee) {
      //this.idGenerator++;
      if(this.employeeDiscountList.length==0)
      {
            var employeeDiscountProduct = angular.copy(discountProduct); //Shallow copy
            employeeDiscountProduct.percentDiscount = employee.discount;
            this.employeeDiscount = employee.discount;
            this.employeeDiscountList.push(employeeDiscountProduct);
            this.totalCost = calculateTotal(this.scannedItems) * ((100 - employee.discount) / 100);
            if(this.stateTaxPecentage>1)
            {
                  this.totalCost = ((this.stateTaxPecentage/100)+1)*this.totalCost;
            }
      }else
      {
          alert("Only 1 discount can be applied to a transaction.");
      }
     
    }
    
    function applyStateTax(tax)
    {
        this.stateTaxPecentage = tax;
        this.totalCost = ((tax/100)+1)*calculateTotal(this.scannedItems);
        this.stateTaxTotal = this.subTotalCost * ((tax/100));
        if(this.employeeDiscount > 1)
        {
            this.totalCost = this.totalCost * ((100 - this.employeeDiscount) / 100);
        }
    }

    function calculateTotal(scannedItems) {
      //Loop through scannedItems to calculate total cost
      var total = 0;
      angular.forEach(scannedItems, function(item) {
        if (item.product.code !== EMP_DISCOUNT_PRODUCT_CODE) {
          total += item.cost;
        }
      });
      return total;
    }

    function itemLookup(data, code) {
      var item = null;
      angular.forEach(data, function(value) {
        if (code === value.code) {
          item = value;
          return false; // break out of loop when we find item
        }
      });
      return item;
    }
    
    function SetCompanyInfo(companyName, companyCity, companyPhone)
    {
      this.companyName=companyName;
      sharedProperties.setCompany(companyName);
      this.companyCity=companyCity;
      sharedProperties.setCompanyCity(companyCity);
      this.companyPhone=companyPhone;
      sharedProperties.setCompanyPhone(companyPhone);
    }
  }
})();