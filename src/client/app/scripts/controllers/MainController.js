'use strict';

angular.module('MedExplorer')
  .controller('MainController', ['$scope', '$state', function ($scope, $state) {
    $scope.update = function(search) {
      $state.go('home.search', {'value':$scope.search.value});
    };
  }]);
