'use strict';

angular.module('MedExplorer')
  .controller('SidebarRecentRecallsController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/REST/recentRecalls').success(function(data) {
      if(!data.error) {
//        console.log(data);
        $scope.results = data.response;
      }
      $scope.resultsLength = 0;
      if($scope.results && $scope.results.length) {
        $scope.resultsLength = $scope.results.length;
      }
    });
  }]);
