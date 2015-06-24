"use strict";

angular.module('MedExplorer')
  .factory('searchResultsFactory', ['$rootScope', '$http', 'lodash', function($rootScope, $http) {
    var searchResults = {
      results: null,
      executeSearch: executeSearch
    };

    function executeSearch(source, type, field, value, limit) {
      $http.get('/REST/search?source=' + source
        + '&type=' + type
        + '&field=' + field
        + '&value=' + value
        + '&limit=' + limit).success(function(data) {
          if(!data.error) {
            searchResults.results = data.response.results;
            $rootScope.$broadcast('searchResultsRetrieved', '');
            if(searchResults.results && searchResults.results.length) {
              for(var drug in searchResults.results) {
                if(searchResults.results[drug].openfda.brand_name) {
                  searchResults.results[drug].has_ongoing_recalls = false;
                  setTimeout(function hasRecall(index) {
                    $http.get('/REST/search?source=drug'
                      + '&type=enforcement'
                      + '&field=[\"openfda.spl_id\",\"status\"]'
                      + '&value=[\"\\\"' + searchResults.results[index].openfda.spl_id[0] + '\\\"\",\"Ongoing\"]&terms=2&limit='+ 100).success(function(recalls) {
                        searchResults.results[index].has_ongoing_recalls = recalls.response && recalls.response.results.length > 0;
                        if(searchResults.results[index].has_ongoing_recalls) {
                          searchResults.results[index].recall = recalls.response.results[0];
                        }
                        $rootScope.$broadcast('searchResultsRetrieved', '');
                      });
                  }, 300 * drug, drug);
                }
              }
            }
          }
      });
    }
 
    return searchResults;
  }]);
