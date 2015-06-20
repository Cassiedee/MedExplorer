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
  ]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/helloworld.html',
        controller: 'HelloWorldController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
