'use strict';

angular.module('MedExplorer')
  .controller('SidebarSearchResultsController', ['$scope', '$stateParams', 'searchResultsFactory', function ($scope, $stateParams, searchResultsFactory) {
    $scope.results = [];
    $scope.searchTerm = $stateParams.value;

    $scope.$on('searchResultsRetrieved', function() {
      console.log('received');
      $scope.results = searchResultsFactory.results;
    });
  }]);
