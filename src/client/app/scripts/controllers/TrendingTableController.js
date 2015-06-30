// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('TrendingTableController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.$state = $state;
    $scope.trendingTablesAreIn = false;
    $http.get('/REST/trendingDrugs').success(function(data) {
      if(!data.error) {
        $scope.results = data.response;
        $scope.trendingTablesAreIn = true;
      }
    });
  }]);
