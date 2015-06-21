'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('FDAExplorer', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]).config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/helloworld.html',
        controller: 'HelloWorldController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name FDAExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the FDAExplorer
 */
angular.module('FDAExplorer')
  .controller('HelloWorldController', ["$scope", function ($scope) {
    $scope.message = 'Hello World!';
    console.log($scope.message);
  }]);
