'use strict';

angular.module('MedExplorer')
  .controller('MainController', ['$scope', '$state', '$filter', function ($scope, $state, $filter) {
    $scope.update = function() {
    	//alert('button pressed: ' + $scope.search.value);
    	$state.go('home.search', {'value':$filter('title')($scope.search.value)});
      };
  }]);
