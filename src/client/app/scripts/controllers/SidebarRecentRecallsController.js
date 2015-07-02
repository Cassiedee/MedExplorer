// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('SidebarRecentRecallsController', ['$scope', '$http', function ($scope, $http) {
    $scope.sidebar = {};
    $scope.sidebar.recentRecallsAreIn = false;
    $http.get('/REST/recentRecalls').success(function(data) {
      console.log(data.source);
      if(data.source === 'recentRecalls') {
        if(!data.error) {
          $scope.sidebar.recalls = data.response;
          $scope.sidebar.recentRecallsAreIn = true;
        }
      }
    });
  }]);
