'use strict';

/**
 * @ngdoc function
 * @name FDAExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the FDAExplorer
 */
angular.module('FDAExplorer')
  .controller('HelloWorldController', function ($scope) {
    $scope.message = 'Hello World!';
    console.log($scope.message);
  });
