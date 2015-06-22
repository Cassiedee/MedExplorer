'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:MainController
 * @description
 * # MainController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('MainController', function ($scope, $location) {
    $scope.message = '';
    console.log($scope.message);
    
    $scope.update = function(search) {
    	alert('button pressed: ' + $scope.search.value);
    	$location.path('/search?value='+$scope.search.value);
      };
  });
