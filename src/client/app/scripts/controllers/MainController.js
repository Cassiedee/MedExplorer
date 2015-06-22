'use strict';

angular.module('MedExplorer')
  .controller('MainController', ['$scope', '$state', function ($scope, $state) {
    $scope.update = function() {
    	//alert('button pressed: ' + $scope.search.value);
    	$state.go('home.search', {'value':$scope.search.value});
      };
  }]);
