'use strict';

angular.module('MedExplorer')
  .controller('SearchResultsController', ['$scope', '$rootScope', '$stateParams', 'searchResultsFactory', function($scope, $rootScope, $stateParams, searchResultsFactory) {
    $scope.results = [];
    $scope.currentPage = 1;
    $scope.searchTerm = $stateParams.value;
    searchResultsFactory.executeSearch($stateParams.source,
        $stateParams.type, $stateParams.field, $stateParams.value, $stateParams.limit);

    $scope.$on('searchResultsRetrieved', function(event, data) {
      console.log('Search results came back??');
      console.log(searchResultsFactory.results);
      $scope.results = searchResultsFactory.results;
    });
  }]);
