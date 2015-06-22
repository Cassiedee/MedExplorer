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
          'main@': {
            controller: 'MainController',
            templateUrl: 'views/main.html'
          },
		  'content@home': {
		    controller: 'SecondViewController',
			templateUrl: 'views/trendingtable.html'
		  }
        }
      })
      .state('home.search', {
        url: 'search?value',
        views: {
          'content@home': {
            controller: 'SearchResultsController',
            templateUrl: 'views/search_results.html'
          }
        }
      })      
      .state('home.drugdetails', {
          url: 'drugdetails?name',
          views: {
            'content@home': {
              controller: 'DrugDetailsController',
              templateUrl: 'views/drugdetails.html'
            }
          }
        });

      $urlRouterProvider.otherwise('/');
  });
