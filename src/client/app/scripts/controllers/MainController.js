'use strict';

angular.module('MedExplorer')
  .controller('MainController', ['$scope', '$state', '$filter', function ($scope, $state, $filter) {
    $scope.update = function() {
    	//alert('button pressed: ' + $scope.search.value);
    	$state.go('home.search', {
          'source': 'drug',
          'type': 'label',
          'field': 'openfda.brand_name',
          'value': $filter('title')($scope.search.value)
        });
      };
  }]);
