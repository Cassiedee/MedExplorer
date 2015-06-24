"use strict";

angular.module('MedExplorer')
  .directive('sampleChart', function($document, $window) {
    return {
      restrict: 'A',
      scope: {
        id: '=sampleChart'
      },
      link: function(scope, element, attrs) {
        var chart = c3.generate({
            bindto: scope.id,
            data: {
                columns: [
                    ['data1', 30],
                    ['data2', 120],
                ],
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
              title: "Iris Petal Width"
            }
        });
      }
    };
  });

