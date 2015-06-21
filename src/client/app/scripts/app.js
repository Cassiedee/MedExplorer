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
        controller: 'HelloWorldController',
        views: {
          'main': {
            templateUrl: 'views/main.html'
          }
        }
      })
      .state('home.search', {
        url: 'search',
        controller: 'SearchResultsController',
        views: {
          'content': {
            templateUrl: 'views/search_results.html'
          }
        }
      })
      .state('home.test', {
        url: 'test',
        controller: 'SecondViewController',
        views: {
          'content': {
            templateUrl: 'views/secondview.html'
          }
        }
      });

      $urlRouterProvider.otherwise("/");;
  });
