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
    'ui.router',
    'ngLodash'
  ]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'main@': {
            controller: 'MainController',
            templateUrl: 'views/main.html'
          },
          'side-panel@home': {
            controller: 'MostRecentRecallsController',
            templateUrl: 'views/most_recent_recalls.html'
          },
          'content@home': {
                controller: 'TrendingTableController',
                templateUrl: 'views/trendingtable.html'
          }
        }
      })
      .state('home.search', {
        url: 'search?source&type&field&value',
        views: {
          'side-panel@home': {
            template: ''
          },
          'content@home': {
            controller: 'SearchResultsController',
            templateUrl: 'views/search_results.html'
          }
        }
      })      
      .state('home.drugdetails', {
        url: 'drugdetails?name',
        views: {
        'side-panel@home': {
          template: ''
        },
          'content@home': {
            controller: 'DrugDetailsController',
            templateUrl: 'views/drugdetails.html'
          }
        },
        params: {
          drugDetails: null,
        }
      })
      .state('home.recalldetails', {
        url: 'recalldetails?id',
        views: {
          'side-panel@home': {
          template: ''
        },
          'content@home': {
            controller: 'RecallDetailsController',
            templateUrl: 'views/recall_details.html'
          }
        }
      });

      $urlRouterProvider.otherwise('/');
  });
