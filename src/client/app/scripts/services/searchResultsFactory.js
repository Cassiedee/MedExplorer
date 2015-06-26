// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
"use strict";

angular.module('MedExplorer')
  .factory('searchResultsFactory', ['$rootScope', '$http', 'lodash', function($rootScope, $http) {
    var searchResults = {
      results: null,
      executeSearch: executeSearch
    };

    function executeSearch(source, type, field, value, limit) {
      console.log('field ' + field);
      console.log('value ' + value);
      $http.get('/REST/search?source=' + source
        + '&type=' + type
        + '&field=' + field
        + '&value=' + value
        + '&limit=' + limit).success(function(data) {
          if(!data.error) {
            searchResults.results = data.response.results;
            $rootScope.$broadcast('searchResultsRetrieved', '');
            if(searchResults.results && searchResults.results.length) {
              var drug_name;
              if(field == 'openfda.brand_name' || field == 'openfda.generic_name') {
                drug_name = value;
              }
              else if(field instanceof Array && field.length) {
                for(var i = 0; i < field.length; i++) {
                  if(field[i] == 'openfda.brand_name' || field[i] == 'openfda.generic_name') {
                    drug_name = value[i];
                    break;
                  }
                }
              }
              console.log(drug_name);
              if(drug_name) {
                var otc = 0;
                var prescription = 0;
                var type;
                for(var drug in searchResults.results) {
                  if(searchResults.results[drug].openfda) {
                    for(var type in searchResults.results[drug].openfda.product_type) {
                      console.log(searchResults.results[drug].openfda.product_type[type]);
                      if(searchResults.results[drug].openfda.product_type[type] == 'HUMAN OTC DRUG') {
                        otc++;
                      }
                      else if(searchResults.results[drug].openfda.product_type[type] == 'HUMAN PRESCRIPTION DRUG') {
                        prescription++;
                      }
                    }
                  }
                }
                if(prescription > otc) {
                  type = 'prescription';
                }
                else if(otc > prescription) {
                  type = 'otc';
                }
                console.log(type);
                if(type) {
                  $http.post('/REST/trendingDrugs', {
                    'name': drug_name.toLowerCase(),
                    'type': type
                  });
                }
              }
              for(var drug in searchResults.results) {
                if(searchResults.results[drug].openfda.brand_name) {
                  searchResults.results[drug].has_ongoing_recalls = false;
                  setTimeout(function hasRecall(index) {
                    if(searchResults.results && searchResults.results[index] && searchResults.results[index].openfda) {
                      $http.get('/REST/search?source=drug'
                        + '&type=enforcement'
                        + '&field=[\"openfda.spl_id\",\"status\"]'
                        + '&value=[\"\\\"' + searchResults.results[index].openfda.spl_id[0] + '\\\"\",\"Ongoing\"]&terms=2&limit='+ 30).success(function(recalls) {
                          searchResults.results[index].has_ongoing_recalls = recalls.response && recalls.response.results && recalls.response.results.length > 0;
                          if(searchResults.results[index].has_ongoing_recalls) {
                            searchResults.results[index].recalls = recalls.response.results;
                          }
                          $rootScope.$broadcast('searchResultsRetrieved', '');
                        });
                    }
                  }, 250 * drug, drug);
                }
              }
            }
          }
      });
    }
 
    return searchResults;
  }]);
