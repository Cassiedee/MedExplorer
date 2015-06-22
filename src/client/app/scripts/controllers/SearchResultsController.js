'use strict';

angular.module('MedExplorer')
  .controller('SearchResultsController', ['$scope', '$http','$state', function($scope, $http, $state) {
    $scope.results = [];
    $scope.searchTerm = $state.params.value;
    $http.get('/REST/search?datasource=drug&type=label&field=openfda.brand_name&value='+$state.params.value).success(function(data) {
      if(!data.error)
        $scope.results = data.response.results;
      $scope.resultsLength = 0;
      if($scope.results && $scope.results.length)
        $scope.resultsLength = $scope.results.length;
      console.log($scope.resultsLength);
    });
  }]);
