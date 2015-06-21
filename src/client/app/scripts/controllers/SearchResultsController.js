'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:SearchResultsController
 * @description
 * # SearchResultsController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('SearchResultsController', function ($scope) {
    $scope.message = 'View #2!';
    console.log($scope.message);
  });
