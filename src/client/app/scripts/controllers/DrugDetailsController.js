'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('DrugDetailsController', ['$scope', '$http','$state', '$stateParams', '$sce', function($scope, $http, $state, $stateParams, $sce) {
        $scope.tab = 1;
        $scope.drugname = $state.params.name;

        $scope.result = $stateParams.drugDetails;
        console.log('detail result ');
        console.log($scope.result);
        if($scope.result ){
          console.log('indications: ' + $scope.result.indications_and_usage[0])
          $scope.indicationListArray = dataSplitter($scope.result.indications_and_usage[0]);
          if($scope.result.contraindications){
          $scope.contraindicationListArray = dataSplitter($scope.result.contraindications[0]);
          } else {
        	  $scope.contraindicationListArray = [];
          }
          if( $scope.result.drug_abuse_and_dependence){
          $scope.abuseListArray = $scope.result.drug_abuse_and_dependence[0];
          console.log($scope.indicationListArray);
          } else {
        	  $scope.abuseListArray = {};
          }
        }

        $scope.selectTab = function (setTab){
            $scope.tab = setTab;
        };
        $scope.isSelected = function(checkTab) {
            return $scope.tab === checkTab;
        };
	    
       $scope.trustAdverseReactionsAsHtml = function() {
           if($scope.result && $scope.result.adverse_reactions_table){
              return $sce.trustAsHtml($scope.result.adverse_reactions_table[0]); //html content is th binded content.
           }
       };
  }]);

var dataSplitter = function(toParse) {	
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