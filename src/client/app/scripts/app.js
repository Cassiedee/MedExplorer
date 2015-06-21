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
  .module('MedExplorer', [
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
      .when('/test', {
        templateUrl: 'views/secondview.html',
        controller: 'SecondViewController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
