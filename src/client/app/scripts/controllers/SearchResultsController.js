// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('SearchResultsController', ['$scope', '$rootScope', '$filter', '$stateParams', 'searchResultsFactory', function($scope, $rootScope, $filter, $stateParams, searchResultsFactory) {
    $scope.value = $filter('title')($stateParams.value);
    $scope.results = [];
    $scope.resultsAreIn = false;
    $scope.searchTerm = $stateParams.value;
    searchResultsFactory.executeSearch($stateParams.source,
        $stateParams.type, $stateParams.field, $stateParams.value, $stateParams.limit);

    $scope.$on('searchResultsRetrieved', function(event, data) {
      $scope.results = searchResultsFactory.results;
      $scope.resultsAreIn = true;
    });
  }]);
