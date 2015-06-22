'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:MainController
 * @description
 * # MainController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('MainController', ['$scope', '$state', function ($scope, $state) {
    $scope.update = function() {
    	//alert('button pressed: ' + $scope.search.value);
    	$state.go('home.search', {'value':$scope.search.value});
      };
  }]);
