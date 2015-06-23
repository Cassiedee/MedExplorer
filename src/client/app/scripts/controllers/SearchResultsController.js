'use strict';

angular.module('MedExplorer')
  .controller('SearchResultsController', ['$scope', '$http','$state', function($scope, $http, $state) {
    $scope.results = [];
    $scope.searchTerm = $state.params.value;
    $http.get('/REST/search?source=' + $state.params.source
      + '&type=' + $state.params.type
      + '&field=' + $state.params.field
      + '&value=' + $state.params.value).success(function(data) {
      if(!data.error)
        $scope.results = data.response.results;
      $scope.resultsLength = 0;
      if($scope.results && $scope.results.length) {
        $scope.resultsLength = $scope.results.length;
        for(var drug in $scope.results) {
          $scope.results[drug].has_ongoing_recalls = false;
          setTimeout(function hasRecall(index) {
            $http.get('/REST/search?source=drug'
              + '&type=enforcement'
              + '&field=[\"openfda.brand_name\",\"status\",\"classification\"]'
              + '&value=[\"' + $scope.results[index].openfda.brand_name[0] + '\",\"Ongoing\",\"Class I\"]&terms=2').success(function(recalls) {
                $scope.results[index].has_ongoing_recalls = recalls.response && recalls.response.results.length > 0;
              });
          }, 300 * drug, drug);          
        }
      }
    });
  }]);
