"use strict";

angular.module('MedExplorer')
  .directive('baseballCard', function($document, $window, lodash) {
    return {
      restrict: 'A',
      scope: {
        minWidth: '=scrollableDiv'
      },
      link: function(scope, element, attrs) {
        scope.$watch(function() {
          return element.height(); 
        }, function() {
          element.find('.recall-background').height(element.height() + "px");
        })
      }
    };
  });
