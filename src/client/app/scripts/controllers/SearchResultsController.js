'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:SearchResultsController
 * @description
 * # SearchResultsController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('SearchResultsController', ['$scope', '$http','$state', function($scope, $http, $state) {
    $scope.results = 'temp';
    console.log('called');
    // Simple GET request example :
    $http.get('/REST/search?field=patient.drug.openfda.pharm_class_epc&value='+$state.params.value).success(function(data) {
      $scope.results = data
    });
  }]);
