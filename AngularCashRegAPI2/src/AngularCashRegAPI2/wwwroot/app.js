!function(){"use strict";angular.module("heroesApp",["ngAnimate","ngRoute","categoryService"])}(),function(){"use strict";function a(a){function b(){a.init(),m.expirationDate=a.expirationDate,m.totalCost=a.totalCost,m.subTotalCost=a.subTotalCost,m.categoryList=a.categoryList,m.stateTaxTotal=a.stateTaxTotal;var b=a.getEmployees();b.then(function(a){m.employeeList=a});var c=a.getStates();c.then(function(a){m.stateList=a}),m.productSelectedName="",m.companyCity=a.companyCity,m.companyName=a.companyName,m.companyPhone=a.companyPhone,m.scannedItems=a.scannedItems,m.discountApplied=a.employeeDiscountList}function c(){m.productList=[];var b=a.getProducts(m.categorySelected);b.then(function(a){m.productList=a})}function d(){var b=parseFloat(m.productQuantity);m.productSelected&&angular.isNumber(b)&&a.scan(m.productSelected,b),m.totalCost=a.totalCost,m.subTotalCost=a.subTotalCost}function e(){var b=parseFloat(m.stateSelected.tax);m.stateSelected.tax&&angular.isNumber(b)&&a.applyStateTax(b),m.totalCost=a.totalCost,m.stateTaxTotal=a.stateTaxTotal}function f(b){a.voidItem(b.product,b.cost,b.quantity),m.totalCost=a.totalCost,m.subTotalCost=a.subTotalCost,m.scannedItems=a.scannedItems}function g(){a.voidAllTransactions(),m.totalCost=a.totalCost,m.scannedItems=a.scannedItems}function h(){a.applyEmployeeDiscount(m.employeeSelected),m.totalCost=a.totalCost}function i(){a.removeDiscountItem(),m.totalCost=a.totalCost,m.discountApplied=a.employeeDiscountList}function j(){return void 0===m.productSelected||""==m.productSelected}function k(){return void 0===m.productQuantity||""==m.productQuantity}function l(){return void 0===m.employeeSelected||""==m.employeeSelected}var m=this;m.currencySymbol=a.currency.symbol,m.addItem=d,m.applyEmpDiscount=h,m.getProducts=c,m.reqQuantity=k,m.productCheck=j,m.voidLastTxn=a.voidLastTransaction,m.removeItem=f,m.cancelSale=g,m.EmployeeSelectCheck=l,m.removeDiscountItem=i,m.applyStateTax=e,m.SetCompanyInfo=a.SetCompanyInfo,b()}angular.module("heroesApp").controller("dashboardController",a),a.$inject=["cashRegisterService"]}(),function(){"use strict";function a(a){a.showModal=!1,a.toggleModal=function(){a.showModal=!a.showModal}}angular.module("heroesApp").controller("modalcontroller",a),a.$inject=["$scope"]}(),function(){"use strict";function a(){return{template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">{{ title }}</h4></div><div class="modal-body" ng-transclude></div></div></div></div>',restrict:"E",transclude:!0,replace:!0,scope:!0,link:function(a,b,c){a.title=c.title,a.$watch(c.visible,function(a){1==a?$(b).modal("show"):$(b).modal("hide")}),$(b).on("shown.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!0})}),$(b).on("hidden.bs.modal",function(){a.$apply(function(){a.$parent[c.visible]=!1})})}}}angular.module("heroesApp").directive("modal",a)}(),function(){"use strict";function a(a,b){return{require:"ngModel",link:function(c,d,e,f){var g=function(){var b=d.val().replace(/[^0-9]/g,"");d.val(a("tel")(b,!1))};f.$parsers.push(function(a){return a.replace(/[^0-9]/g,"").slice(0,10)}),f.$render=function(){d.val(a("tel")(f.$viewValue,!1))},d.bind("change",g),d.bind("keydown",function(a){var c=a.keyCode;91==c||c>15&&19>c||c>=37&&40>=c||b.defer(g)}),d.bind("paste cut",function(){b.defer(g)})}}}angular.module("heroesApp").directive("phoneInput",a),a.$inject=["$filter","$browser"],angular.module("heroesApp").filter("tel",function(){return function(a){if(!a)return"";var b=a.toString().trim().replace(/^\+/,"");if(b.match(/[^0-9]/))return a;var c,d;switch(b.length){case 1:case 2:case 3:c=b;break;default:c=b.slice(0,3),d=b.slice(3)}return d?(d=d.length>3?d.slice(0,3)+"-"+d.slice(3,7):d,("("+c+") "+d).trim()):"("+c}})}(),function(){"use strict";function a(a,b,c,d){function e(c){switch(c.Name){case"Kitchen":var d=a.defer();return b.get("json/Kitchen.json").success(function(a){F=a,d.resolve(a)}).error(function(a){d.reject(a)}),d.promise;case"Electronic":var d=a.defer();return b.get("json/Electronic.json").success(function(a){F=a,d.resolve(a)}).error(function(a){d.reject(a)}),d.promise;case"Grocery":var d=a.defer();return b.get("json/Products.json").success(function(a){F=a,d.resolve(a)}).error(function(a){d.reject(a)}),d.promise;case"Clothing":var d=a.defer();return b.get("json/Clothing.json").success(function(a){F=a,d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}}function f(){var c=a.defer();return b.get("json/Employees.json").success(function(a){G=a,c.resolve(a)}).error(function(a){c.reject(a)}),c.promise}function g(){var c=a.defer();return b.get("json/States.json").success(function(a){H=a,c.resolve(a)}).error(function(a){c.reject(a)}),c.promise}function h(){this.scannedItems=[],this.totalCost=0,this.idGenerator=0,this.expirationDate=i(),this.companyName=c.getCompany(),this.companyCity=c.getCompanyCity(),this.companyPhone=c.getCompanyPhone()}function i(){var a=new Date,b=45;a.setDate(a.getDate()+b);var c=a.getDate(),d=a.getMonth()+1,e=a.getFullYear(),f=d+"/"+c+"/"+e;return f}function j(a,b){this.idGenerator++;var c=jQuery.extend(!0,{},a);c.code+=this.idGenerator,this.scannedItems.push({id:this.idGenerator,product:c,quantity:b,cost:c.price*b}),this.totalCost+=k(c,b),this.subTotalCost=r(this.scannedItems)}function k(a,b){return a.price*b}function l(){this.scannedItems=[],this.totalCost=0,this.idGenerator=0}function m(){if(0===this.scannedItems.length)return!1;var a=this.scannedItems.pop();return a.product.code===v?this.totalCost*=(100+a.product.price)/100:this.totalCost-=a.cost,!0}function n(a,b,c){for(var d=0;d<this.scannedItems.length;d++)if(this.scannedItems[d].product.code===a.code){this.scannedItems.splice(d,1),this.totalCost-=b*c;break}this.subTotalCost=r(this.scannedItems)}function o(){this.employeeDiscountList=[],this.totalCost=r(this.scannedItems),this.stateTaxPecentage>1&&(this.totalCost=(this.stateTaxPecentage/100+1)*this.totalCost),this.employeeDiscount=1}function p(a){if(0==this.employeeDiscountList.length){var b=angular.copy(u);b.percentDiscount=a.discount,this.employeeDiscount=a.discount,this.employeeDiscountList.push(b),this.totalCost=r(this.scannedItems)*((100-a.discount)/100),this.stateTaxPecentage>1&&(this.totalCost=(this.stateTaxPecentage/100+1)*this.totalCost)}else alert("Only 1 discount can be applied to a transaction.")}function q(a){this.stateTaxPecentage=a,this.totalCost=(a/100+1)*r(this.scannedItems),this.stateTaxTotal=this.subTotalCost*(a/100),this.employeeDiscount>1&&(this.totalCost=this.totalCost*((100-this.employeeDiscount)/100))}function r(a){var b=0;return angular.forEach(a,function(a){a.product.code!==v&&(b+=a.cost)}),b}function s(a,b,d){this.companyName=a,c.setCompany(a),this.companyCity=b,c.setCompanyCity(b),this.companyPhone=d,c.setCompanyPhone(d)}var t,u,v,w,x,y,z,A=0,B=0,C=1,D=1,E={name:"BBD",symbol:"$",rate:1.98},F=[],G=[],H=[],I=d.query(),J=[];v="9999",u={code:v,percentDiscount:0,name:"Employee Discount"};var K={init:h,scan:j,voidItem:n,voidLastTransaction:m,voidAllTransactions:l,applyEmployeeDiscount:p,employeeDiscountList:J,categoryList:I,productList:F,employeeList:G,stateList:H,currency:E,totalCost:A,subTotalCost:B,scannedItems:t,getProducts:e,getEmployees:f,getStates:g,removeDiscountItem:o,expirationDate:w,companyCity:y,companyName:x,companyPhone:z,applyStateTax:q,stateTaxPecentage:C,employeeDiscount:D,SetCompanyInfo:s};return K}angular.module("heroesApp").factory("cashRegisterService",a),a.$inject=["$q","$http","changeCompanyService","Category"]}(),function(){"use strict";var a=angular.module("categoryService",["ngResource"]);a.factory("Category",["$resource",function(a){return a("/api/Category",{},{query:{method:"GET",params:{},isArray:!0}})}])}(),function(){"use strict";function a(a){var b="Foo Company",c="Philadelphia",d="609-509-6101";return{getCompany:function(){return b},setCompany:function(a){b=a},getCompanyCity:function(){return c},setCompanyCity:function(a){c=a},getCompanyPhone:function(){return d},setCompanyPhone:function(a){d=a}}}angular.module("heroesApp").factory("changeCompanyService",a),a.$inject=["$http"]}();