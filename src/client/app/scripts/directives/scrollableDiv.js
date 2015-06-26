// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
"use strict";

angular.module('MedExplorer')
  .directive('scrollableDiv', function($document, $window, lodash) {
    return {
      restrict: 'A',
      scope: {
        minWidth: '=scrollableDiv'
      },
      link: function(scope, element, attrs) {
        var w = angular.element($window);

        var lazyListAutoHeight = lodash.debounce(function () {
          if(w.width() >= scope.minWidth) {
            var max = w.height() - element.offset().top;
            element.css('max-height', max - 75 + 'px');
          }
          else
            element.css('max-height', '');
          scope.$apply();
        }, 300);

        $document.ready(function() {
          lazyListAutoHeight();
          element.bind('DOMNodeInserted DOMNodeRemoved', lazyListAutoHeight);
          w.bind('resize', lazyListAutoHeight);
        });
      }
    };
  });
