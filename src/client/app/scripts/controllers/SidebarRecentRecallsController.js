// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .controller('SidebarRecentRecallsController', ['$scope', '$http', function ($scope, $http) {
    $scope.recentRecallsAreIn = false;
    $http.get('/REST/recentRecalls').success(function(data) {
      if(data.source === 'recentRecalls') {
        if(!data.error) {
          $scope.recalls = data.response;
          $scope.recentRecallsAreIn = true;
        }
      }
    });
  }]);
