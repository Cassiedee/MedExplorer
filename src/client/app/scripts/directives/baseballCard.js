"use strict";

angular.module('MedExplorer')
  .directive('baseballCard', function($document, $window, lodash) {
    return {
      restrict: 'A',
      scope: {
        minWidth: '=scrollableDiv'
      },
      link: function(scope, element, attrs) {
        var w = angular.element($window);
		element.bind('DOMNodeInserted DOMNodeRemoved DOMSubtreeModified', function() {
			element.find('.recall-background').height(element.height()+"px");
		});
		w.bind('resize', function() {
			element.find('.recall-background').height(element.height()+"px");
		});
      }
    };
  });
