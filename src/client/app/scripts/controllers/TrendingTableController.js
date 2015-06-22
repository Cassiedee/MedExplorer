'use strict';

angular.module('MedExplorer')
  .controller('TrendingTableController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/REST/trendingDrugs').success(function(data) {
      if(!data.error)
        $scope.drugs = data.response;
    });
  }]);
