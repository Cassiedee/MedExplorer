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
                        console.log('fired');
                        console.log(searchResults.results);
            if(searchResults.results && searchResults.results.length) {
              var length = searchResults.results.length;
              for(var drug in searchResults.results) {
                searchResults.results[drug].has_ongoing_recalls = false;
                setTimeout(function hasRecall(index, length) {
                  $http.get('/REST/search?source=drug'
                    + '&type=enforcement'
                    + '&field=[\"openfda.brand_name\",\"status\",\"classification\"]'
                    + '&value=[\"' + searchResults.results[index].openfda.brand_name[0] + '\",\"Ongoing\",\"Class I\"]&terms=2&limit='+ 100).success(function(recalls) {
                      searchResults.results[index].has_ongoing_recalls = recalls.response && recalls.response.results.length > 0;
                      console.log(index + ' ' + length);
                        $rootScope.$broadcast('searchResultsRetrieved', '');
                        console.log('fired');
                        console.log(searchResults.results);
                    });
                }, 300 * drug, drug, length);
              }
            }
          }
      });
    }
 
    return searchResults;
  }]);
