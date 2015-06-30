// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('SidebarRecentRecallsController', ['$scope', '$http', function ($scope, $http) {
    $scope.recentRecallsAreIn = false;
    $http.get('/REST/recentRecalls').success(function(data) {
      if(!data.error) {
        $scope.results = data.response;
        $scope.recentRecallsAreIn = true;
      }
      $scope.resultsLength = 0;
      if($scope.results && $scope.results.length) {
        $scope.resultsLength = $scope.results.length;
      }
    });
  }]);
