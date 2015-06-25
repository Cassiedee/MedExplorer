'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('RecallDetailsController', ['$scope', '$http','$state', '$stateParams', function($scope, $http, $state, $stateParams) {
    if($stateParams.recallDetails) {
      $scope.recallList = $stateParams.recallList;
    }
    else {
      $http.get('/REST/search?source=drug'
        + '&type=enforcement'
        + '&field=openfda.spl_id'
        + '&value=' + $stateParams.spl_id
        + '&limit=100').success(function(data) {
          if(data.response && data.response.results && data.response.results.length > 0) {
            $scope.recallList = data.response.results;
            console.log($scope.recallList);
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
