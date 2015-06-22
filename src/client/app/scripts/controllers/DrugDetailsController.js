'use strict';

/**
 * @ngdoc function
 * @name MedExplorer.controller:HelloWorldController
 * @description
 * # HelloWorldController
 * Controller of the MedExplorer
 */
angular.module('MedExplorer')
  .controller('DrugDetailsController', ['$scope', '$state', function($scope, $state) {
//	  alert('DrugDetailsController contoller called')
		$scope.tab = 1;
	    $scope.drugname = $state.params.name;
	  $scope.selectTab = function (setTab){
//	    	alert('tab selected')
	    	$scope.tab = setTab;
	    };
	    $scope.isSelected = function(checkTab) {
//	    	alert('' + checkTab + ' ' + $scope.tab + " returning: " + ($scope.tab == checkTab));
	    	return $scope.tab == checkTab;
	    };
  }]);
