'use strict';

angular.module('MedExplorer')
  .controller('SearchResultsController', ['$scope', '$http','$state', function($scope, $http, $state) {
    $scope.results = [];
    $scope.searchTerm = $state.params.value;
    $http.get('/REST/search?datasource=drug&type=event&field=patient.drug.openfda.generic_name&value='+$state.params.value).success(function(data) {
      if(!data.error)
        $scope.results = data.response.results;
    });
  }]);
