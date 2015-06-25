// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('SearchResultsController', ['$scope', '$rootScope', '$stateParams', 'searchResultsFactory', function($scope, $rootScope, $stateParams, searchResultsFactory) {
    $scope.results = [];
    $scope.searchTerm = $stateParams.value;
    searchResultsFactory.executeSearch($stateParams.source,
        $stateParams.type, $stateParams.field, $stateParams.value, $stateParams.limit);

    $scope.$on('searchResultsRetrieved', function(event, data) {
      $scope.results = searchResultsFactory.results;
    });
  }]);
