// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
.controller('BreadCrumbsController', ['$scope', '$stateParams', function($scope, $stateParams) {	
	console.log('In breadcrumbs contoller');
	if($stateParams.value)
		$scope.value = $stateParams.value;
	if($stateParams.source)
		$scope.source = $stateParams.source;
	if($stateParams.type)
		$scope.type = $stateParams.type;
	if($stateParams.field)
		$scope.field = $stateParams.field;
	if($stateParams.limit)
		$scope.limit = $stateParams.limit;
	if($stateParams.tabName)
		$scope.tabName = $stateParams.tabName;
	console.log('value ' + $scope.value);
	console.log('source ' + $scope.source);
	console.log('type ' + $scope.type);
	console.log('field ' + $scope.field);
	console.log('limit ' + $scope.limit);
	console.log('tabName ' + $scope.tabName);
}]);
