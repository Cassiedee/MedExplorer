// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
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
    'ngLodash',
    'angularUtils.directives.dirPagination',
    'ui.bootstrap',
    'alv-ch-ng.text-truncate'
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
            controller: 'SidebarRecentRecallsController',
            templateUrl: 'views/sidebar_recent_recalls.html'
          },
          'content@home': {
                controller: 'TrendingTableController',
                templateUrl: 'views/trendingtable.html'
          }
        }
      })
      .state('home.search', {
        url: 'search?source&type&field&value&limit',
        views: {
          'side-panel@home': {
            controller: 'SidebarSearchResultsController',
            templateUrl: 'views/sidebar_search_results.html'
          },
          'content@home': {
            controller: 'SearchResultsController',
            templateUrl: 'views/search_results.html'
          }
        }
      })      
      .state('home.drugdetails', {
        url: 'drugdetails?spl_id',
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
        url: 'recalldetails?spl_id',
        views: {
          'side-panel@home': {
          template: ''
        },
          'content@home': {
            controller: 'RecallDetailsController',
            templateUrl: 'views/recall_details.html'
          }
        },
        params: {
          recallList: null,
        }
      })
      .state('home.about', {
        url: 'about',
        views: {
        'side-panel@home': {
          template: ''
        },
          'main@': {
            controller: 'MainController',
            templateUrl: 'views/about.html'
          }
        }
      });

      $urlRouterProvider.otherwise('/');
  });
