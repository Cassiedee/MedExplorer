// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
"use strict";

angular.module('MedExplorer')
  .factory('searchResultsFactory', ['$rootScope', '$http', 'lodash', function($rootScope, $http) {
    console.log('in searchResultsFactory.js');
    var searchResults = {
      source: null,
      results: null,
      executeSearch: executeSearch
    };

    function executeSearch(source, type, field, value, limit) {

      console.log('in executeSearch: ' + source + ' ' + type + ' ' + field + ' ' + value);

      $http.get('/REST/search?source=' + source
        + '&type=' + type
        + '&field=' + field
        + '&value=' + value
        + '&limit=' + limit).success(function(data) {
          if(!data.error) {
            if(data.source === ('search ' + value)) {
              searchResults.source = data.source;
              searchResults.results = data.response.results;
              $rootScope.$broadcast('searchResultsRetrieved', '');
              if(searchResults.results && searchResults.results.length) {
                var drug_name;
                if(field === 'openfda.brand_name' || field === 'openfda.generic_name') {
                  drug_name = value;
                }
                else if(field instanceof Array && field.length) {
                  for(var i = 0; i < field.length; i++) {
                    if(field[i] === 'openfda.brand_name' || field[i] === 'openfda.generic_name') {
                      drug_name = value[i];
                      break;
                    }
                  }
                }
                if(drug_name) {
                  var otc = 0;
                  var prescription = 0;
                  if(searchResults && searchResults.results) {
                    searchResults.results.forEach(function(drug) {
                      if(drug.openfda.product_type) {
                        drug.openfda.product_type.forEach(function(type) {
                          if(type === 'HUMAN OTC DRUG') {
                            otc++;
                          }
                          else if(type === 'HUMAN PRESCRIPTION DRUG') {
                            prescription++;
                          }
                        });
                      }
                    });
                  }
                  var type;
                  if(prescription > otc) {
                    type = 'prescription';
                  }
                  else if(otc > prescription) {
                    type = 'otc';
                  }
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
                    console.log('index: ' + drug);
                    getRecalls(drug);
                  }
                }
              }
            }
            else {
              console.log(data.source);
            }
          }
      });
    }

    function getRecalls(index) {
      if(searchResults.results && searchResults.results[index] && searchResults.results[index].openfda) {
        var value = '[\"\\\"' + searchResults.results[index].openfda.spl_id[0] + '\\\"\",\"Ongoing\"]';
        $http.get('/REST/search?source=drug'
          + '&type=enforcement'
          + '&field=[\"openfda.spl_id\",\"status\"]'
          + '&value=' + value + '&terms=2&limit='+ 30).success(function(recalls) {
            if(recalls.source === ('search ' + value)) {
              searchResults.results[index].has_ongoing_recalls = recalls.response && recalls.response.results && recalls.response.results.length > 0;
              if(searchResults.results[index].has_ongoing_recalls) {
                searchResults.results[index].recalls = recalls.response.results;
              }
              $rootScope.$broadcast('searchResultsRetrieved', '');
            }
            else {
              console.log(recalls.source);
            }
          });
      }
    };
 
    return searchResults;
  }]);
