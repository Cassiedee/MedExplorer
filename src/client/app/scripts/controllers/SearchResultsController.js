'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:SearchResultsController
 * @description
 * # SearchResultsController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('SearchResultsController', ['$scope', '$http', function($scope, $http) {
    $scope.results = 'temp';
    console.log('called');
    // Simple GET request example :
    $http.get('/REST/trendingDrugs').success(function(data) {
      $scope.results = data
    });
  }]);
