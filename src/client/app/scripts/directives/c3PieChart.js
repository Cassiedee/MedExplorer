'use strict';

angular.module('MedExplorer')
  .directive('c3PieChart', function() {
    return {
      restrict: 'EA',
      scope: {
        data: '=c3PieChart'
      },
      link: function(scope, element, attrs) {
        scope.id = scope.id;
        var chart = c3.generate({
            bindto: element.id,
            data: {
                columns: scope.data,
                type : 'pie',
                onclick: function (d, i) { }
            },
            pie: {
                label: {
                    format: function (value, ratio, id) { return value; }
                }
            },
            tooltip: {
                format: {
                    value: function (value, ratio, id) { return value; }
                }
            }
        });

        scope.$watch(function() { return scope.data; }, function() {
          chart.load({
            columns: scope.data,
          });
        });
      }
    };
  });

