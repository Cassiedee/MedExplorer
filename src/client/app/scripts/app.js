// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
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
    'alv-ch-ng.text-truncate',
    'ncy-angular-breadcrumb'
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
        },
        ncyBreadcrumb: {
            label: 'Home'
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
        },
        ncyBreadcrumb: {
          label: '{{value}}'
        }
      })      
      .state('home.search.drugdetails', {
        url: 'drugdetails?spl_id&tabName',
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
        },
        ncyBreadcrumb: {
          label: '{{tabName}}'
        }
      })
      .state('home.search.recalldetails', {
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
          recallList: null
        },
        ncyBreadcrumb: {
          label: 'Recalls'
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
          recallList: null
        },
        ncyBreadcrumb: {
          label: 'Recalls'
        }
      })
      .state('home.about', {
        url: 'about',
        views: {
          'side-panel@home': {
            template: ''
          },
          'content@home': {
            templateUrl: 'views/about.html'
          }
        },
        ncyBreadcrumb: {
            label: 'About'
        }
      })
       .state('home.license', {
        url: 'license',
        views: {
          'side-panel@home': {
            template: ''
          },
          'content@home': {
            templateUrl: 'views/license.html'
          }
        },
        ncyBreadcrumb: {
          label: 'License'
        }
      });

      $urlRouterProvider.otherwise('/');
  });
