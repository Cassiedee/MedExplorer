// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
.controller('BreadCrumbsController', ['$scope', '$stateParams', function($scope, $stateParams) {	
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
}]);
