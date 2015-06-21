'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('MainController', function ($scope) {
    $scope.message = 'I am a main controller!';
    console.log($scope.message);
  });
