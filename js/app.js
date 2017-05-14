var isDefined = angular.isDefined,
  isUndefined = angular.isUndefined,
  isNumber = angular.isNumber,
  isObject = angular.isObject,
  isArray = angular.isArray,
  isString = angular.isString,
  extend = angular.extend,
  toJson = angular.toJson,
  options = [
    "ALABAMA",
    "ALASKA",
    "AMERICAN SAMOA",
    "ARIZONA",
    "ARKANSAS",
    "CALIFORNIA",
    "COLORADO",
    "CONNECTICUT",
    "DELAWARE",
    "DISTRICT OF COLUMBIA",
    "FEDERATED STATES OF MICRONESIA",
    "FLORIDA",
    "GEORGIA",
    "GUAM",
    "HAWAII",
    "IDAHO",
    "ILLINOIS",
    "INDIANA",
    "IOWA",
    "KANSAS",
    "KENTUCKY",
    "LOUISIANA",
    "MAINE",
    "MARSHALL ISLANDS",
    "MARYLAND",
    "MASSACHUSETTS",
    "MICHIGAN",
    "MINNESOTA",
    "MISSISSIPPI",
    "MISSOURI",
    "MONTANA",
    "NEBRASKA",
    "NEVADA",
    "NEW HAMPSHIRE",
    "NEW JERSEY",
    "NEW MEXICO",
    "NEW YORK",
    "NORTH CAROLINA",
    "NORTH DAKOTA",
    "NORTHERN MARIANA ISLANDS",
    "OHIO",
    "OKLAHOMA",
    "OREGON",
    "PALAU",
    "PENNSYLVANIA",
    "PUERTO RICO",
    "RHODE ISLAND",
    "SOUTH CAROLINA",
    "SOUTH DAKOTA",
    "TENNESSEE",
    "TEXAS",
    "UTAH",
    "VERMONT",
    "VIRGIN ISLANDS",
    "VIRGINIA",
    "WASHINGTON",
    "WEST VIRGINIA",
    "WISCONSIN",
    "WYOMING"
  ];


(function() {
    "use strict";

    angular.module('contactApp', ['ngRoute', 'LocalStorageModule', 'ngMap'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/contactList.html',
                controller: 'contactListController'
            }).when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'contactController'
            }).when('/contact/:id', {
                templateUrl: 'views/contact.html',
                controller: 'contactController'
            });
            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('!');
        })
        .directive('cswFileInput', function() {
            return {
                restrict: 'A',
                scope: {
                    data: '=fileData'
                },
                link: function(scope, element) {
                    element.on('change', function(domEvent) {
                        let reader = new FileReader();
                        reader.onload = function (fileReaderEvent) {
                            scope.$apply(function(scope) {
                                scope.data = fileReaderEvent.target.result;
                            });
                            angular.element(domEvent.target).val('');
                        };
                        reader.readAsDataURL(event.target.files[0]);
                    });
                }
            };
        })
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('08724.hw5');
        })
        .controller('contactListController', function($scope, localStorageService, $location) {
            $scope.go = function (path) {
              $location.path('/contact');
            };
            $scope.getkeys = function(){
                return localStorageService.keys();
            }
            $scope.get = function(key){
                return localStorageService.get(key);
            }
            $scope.getAll = function(){
                var keys = localStorageService.keys();
                var dataSet = [];
                for(var i in keys){
                    var data = localStorageService.get(keys[i]);
                    data.key = keys[i];
                    dataSet.push(data);
                }
                return dataSet;
            }
            $scope.delete = function(key,index){
                localStorageService.remove(key);
                $scope.dataSet.splice(index,1);
            }
            $scope.dataSet = $scope.getAll();
        })
        .controller('contactController', function($scope, localStorageService, $routeParams, $location) {

             $scope.options = options;
             if(!isUndefined($routeParams.id)){
                var currectUser = localStorageService.get($routeParams.id);
                $scope.Contact = currectUser;
             }
             $scope.submit = function() {
                //update user
                if(!isUndefined($routeParams.id)){
                    localStorageService.set($routeParams.id,$scope.Contact);
                }
                else{
                    localStorageService.set(new Date().getTime(),$scope.Contact);
                }
                $location.path('/');
             }
        });

})();