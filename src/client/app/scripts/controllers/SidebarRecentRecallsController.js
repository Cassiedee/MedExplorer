// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('SidebarRecentRecallsController', ['$scope', '$http', function ($scope, $http) {
    $scope.sidebar = {};
    $scope.sidebar.recentRecallsAreIn = false;
    $http.get('/REST/recentRecalls').success(function(data) {
      if(data.source === 'recentRecalls'
        && !data.error && data.response && data.response.results) {
        $scope.sidebar.recalls = data.response.results;
        $scope.sidebar.recentRecallsAreIn = true;
      }
      else {
        console.log(data.source);
      }
    });
  }]);
