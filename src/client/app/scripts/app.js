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
    'ngTouch',
    'ui.router'
  ]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'main': {
            controller: 'HelloWorldController',
            templateUrl: 'views/helloworld.html'
          }
        }
      })
      .state('home.search', {
        url: 'search',
        views: {
          'content': {
            controller: 'SearchResultsController',
            templateUrl: 'views/search_results.html'
          }
        }
      })
      .state('home.test', {
        url: 'test',
        views: {
          'content': {
            controller: 'SecondViewController',
            templateUrl: 'views/secondview.html'
          }
        }
      });

      $urlRouterProvider.otherwise('/');
  });
