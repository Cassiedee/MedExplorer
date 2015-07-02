// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('SidebarSearchResultsController', ['$scope', '$stateParams', 'searchResultsFactory', function ($scope, $stateParams, searchResultsFactory) {
    console.log('in sidebarSearchResultsController.js');
    $scope.results = [];
    $scope.searchTerm = $stateParams.value;

    $scope.$on('searchResultsRetrieved', function() {
      if(searchResultsFactory.source === ('search ' + $stateParams.value)) {
        $scope.results = searchResultsFactory.results;
        $scope.dosageForms = {};
        $scope.distributionTypes = {};
        var unknown_dosage_form = 0;
        var unknown_dist_type = 0;
            if($scope.results){
                  $scope.results.forEach(function(drug) {
                          var dosage_forms = drug.openfda.dosage_form;
                          if(dosage_forms) {
                            dosage_forms.forEach(function(form) {
                                  if(!$scope.dosageForms[form]) {
                                    $scope.dosageForms[form] = 1;
                                  }
                                  else {
                                    $scope.dosageForms[form]++;
                                  }
                            });
                          }
                          else {
                            unknown_dosage_form++;
                          }

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
        
        $scope.dosageForms['Unknown'] = unknown_dosage_form;
        $scope.distributionTypes['Unknown'] = unknown_dist_type;
      }
    });


  }]);
