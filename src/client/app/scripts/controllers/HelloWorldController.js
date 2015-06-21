'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('HelloWorldController', function ($scope) {
    $scope.message = 'Hello World!';
    console.log($scope.message);
  });
