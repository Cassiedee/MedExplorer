// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('SidebarSearchResultsController', ['$scope', '$stateParams', 'searchResultsFactory', function ($scope, $stateParams, searchResultsFactory) {
    $scope.sidebar = {
      search: {}
    };
    $scope.sidebar.search.results = [];
    $scope.searchTerm = $stateParams.value;
    $scope.countingRecalls = searchResultsFactory.countingRecalls;

    $scope.$on('searchResultsRetrieved', function() {
      $scope.recallCount = searchResultsFactory.recallCount;
      $scope.countingRecalls = searchResultsFactory.countingRecalls;
      if(searchResultsFactory.source === ('search ' + $stateParams.value)) {
        $scope.sidebar.search.results = searchResultsFactory.results;
        $scope.distributionTypes = {};
        var unknown_dist_type = 0;
            if($scope.sidebar.search.results){
                  $scope.sidebar.search.results.forEach(function(drug) {
                          var product_type = drug.openfda.product_type;
                          if(product_type) {
                            product_type.forEach(function(type) {
                                  type = type.toLowerCase().replace('otc', 'OTC');
                                  if(!$scope.distributionTypes[type]) {
                                    $scope.distributionTypes[type] = 1;
                                  }
                                  else {
                                    $scope.distributionTypes[type]++;
                                  }
                            });
                          }
                          else {
                            unknown_dist_type++;
                          }
                    });
            }
        $scope.distributionTypes['Unknown'] = unknown_dist_type;
      }
    });


  }]);
