// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('SearchResultsController', ['$scope', '$rootScope', '$filter', '$stateParams', 'searchResultsFactory', function($scope, $rootScope, $filter, $stateParams, searchResultsFactory) {
    console.log('in searchResultsController.js');
    $scope.value = $filter('title')($stateParams.value);
    $scope.search = {};
    $scope.search.results = [];
    $scope.search.resultsAreIn = false;
    $scope.searchTerm = $stateParams.value;
    searchResultsFactory.executeSearch($stateParams.source,
        $stateParams.type, $stateParams.field, $stateParams.value, $stateParams.limit);

    $scope.$on('searchResultsRetrieved', function(event, data) {
      if(searchResultsFactory.source === ('search ' + $stateParams.value)) {
        $scope.search.results = searchResultsFactory.results;
        $scope.search.resultsAreIn = true;
      }
    });
  }]);
