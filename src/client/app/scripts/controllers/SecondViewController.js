'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('SecondViewController', function ($scope) {
    $scope.message = 'View #2!';
    console.log($scope.message);
  });
