'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('SecondViewController', ['$scope', '$http', function($scope, $http) {
  $scope.results = [];
	$http.get('/REST/trendingDrugs').success(function(data) {
      $scope.results = JSON.parse(data);
    });
  }]);
