'use strict';

angular.module('MedExplorer')
  .controller('MostRecentRecallsController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/REST/recentRecalls').success(function(data) {
      if(!data.error) {
        $scope.results = data.response;
      }
      $scope.resultsLength = 0;
      if($scope.results && $scope.results.length) {
        $scope.resultsLength = $scope.results.length;
      }
    });
  }]);
