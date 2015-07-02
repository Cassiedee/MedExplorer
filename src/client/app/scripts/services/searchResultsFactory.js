// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
"use strict";

angular.module('MedExplorer')
  .factory('searchResultsFactory', ['$rootScope', '$http', 'lodash', function($rootScope, $http) {
    var searchResults = {
      source: null,
      results: null,
      executeSearch: executeSearch,
      recallCount: 0,
      countingRecalls: true
    };

    var requestsReturned = 0;

    function executeSearch(source, type, field, value, limit) {
      searchResults.countingRecalls = true;
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
                
                requestsReturned = 0;
                searchResults.recallCount = 0;
                for(var drug = 0; drug < searchResults.results.length; drug++) {
                  getRecalls(drug, searchResults.results.length);
                }
              }
            }
            else {
              console.log(data.source);
            }
          }
      });
    }

    function getRecalls(index, total) {
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
                searchResults.recallCount++;
                console.log(searchResults.recallCount);
              }
              requestsReturned++;
              console.log(requestsReturned + ' : ' + total);
              if(requestsReturned >= total) {
                searchResults.countingRecalls = false;
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
