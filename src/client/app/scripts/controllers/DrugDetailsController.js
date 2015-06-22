'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('DrugDetailsController', ['$scope', '$http','$state','$sce', function($scope, $http, $state,$sce) {
        $scope.results = [];
		$scope.tab = 1;
	    $scope.drugname = $state.params.name;

	    $http.get('/REST/search?datasource=drug&type=label&field=openfda.brand_name&value='+$state.params.name).success(function(data) {
	    	if(!data.error)
	    		$scope.results = data.response.results;
	    	//  console.log($scope.results[0]);
	    	$scope.resultsLength = 0;
	    	if($scope.results && $scope.results.length){
	    		$scope.resultsLength = $scope.results.length;

	    		var dataSplitter = function(toParse){
	    			
	    			//Split the data into multiple bulleted lists each starting with a header
	    			var bullet = String.fromCharCode(8226);
	    			var elements=toParse.split(bullet);
	    			var listArray = [];
	    			var list = new Object();
	    			list.list = [];
	    			for(var i = 0; i < elements.length; i++){
	    				var trimmed = elements[i].trim();
	    				if(trimmed.endsWith(':')){
	    					//if there is already data start a new indicationList
	    					if(list.list.length > 0){
	    						listArray.push(list);
	    						list = new Object();
	    						list.list = [];
	    					}
	    					list.header = trimmed;
	    				} else if(trimmed.length > 0) {
	    					list.list.push(trimmed);
	    				}
	    			}
	    			//copy the last list into the object
	    			listArray.push(list);
	    			return listArray
	    		}
	    		$scope.indicationListArray = dataSplitter($scope.results[0].indications_and_usage[0]);
	    		$scope.contraindicationListArray = dataSplitter($scope.results[0].contraindications[0]);
	    		console.log($scope.indicationListArray);
	    	}
	    });

	    $scope.selectTab = function (setTab){
//	    	alert('tab selected')
	    	$scope.tab = setTab;
	    };
	    $scope.isSelected = function(checkTab) {
//	    	alert('' + checkTab + ' ' + $scope.tab + " returning: " + ($scope.tab == checkTab));
	    	return $scope.tab == checkTab;
	    };
	    
	       $scope.trustAdverseReactionsAsHtml = function() {
	    	   if($scope.results[0] != null){
	    		   console.log($scope.results);
	    		   console.log($scope.results[0])
	    		   return $sce.trustAsHtml($scope.results[0].adverse_reactions_table[0]); //html content is th binded content.
	    	   }
	       };
  }]);
