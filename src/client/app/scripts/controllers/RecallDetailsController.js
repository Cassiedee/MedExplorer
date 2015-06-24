'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('RecallDetailsController', ['$scope', '$http','$state', '$stateParams', '$sce', function($scope, $http, $state, $stateParams, $sce) {
    $scope.recallDetails = $stateParams.recallDetails;
    console.log($stateParams);

    if($stateParams.drugDetails) {
      $scope.recallDetails = $stateParams.recallDetails;
    }
    else {
      $http.get('/REST/search?source=drug'
        + '&type=enforcement'
        + '&field=event_id'
        + '&value=' + $stateParams.event_id
        + '&limit=100').success(function(data) {
          console.log(data);
          if(data.response.results && data.response.results.length > 0) {
            $scope.recallDetails = data.response.results[0];
            
          }
        });
    }
  }]);

function dataSplitter(toParse) {	
    //Split the data into multiple bulleted lists each starting with a header
    var bullet = String.fromCharCode(8226);
    var elements=toParse.split(bullet);
    var listArray = [];
    var list = {};
    list.list = [];
    for(var i = 0; i < elements.length; i++) {
      var trimmed = elements[i].trim();
      if(trimmed.endsWith(':')) {
        //if there is already data start a new indicationList
        if(list.list.length > 0) {
          listArray.push(list);
          list = {};
          list.list = [];
        }
        list.header = trimmed;
      } else if(trimmed.length > 0) {
        list.list.push(trimmed);
      }
    }
    //copy the last list into the object
    listArray.push(list);
    return listArray;
  };
