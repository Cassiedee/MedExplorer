// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('TrendingTableController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/REST/trendingDrugs').success(function(data) {
      if(!data.error)
        $scope.results = data.response;
    });
  }]);
