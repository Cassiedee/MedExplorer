// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .directive('c3PieChart', ['$state', function($state) {
    return {
      restrict: 'EA',
      scope: {
        data: '=c3PieChart'
      },
      link: function(scope, element) {
        scope.id = scope.id;
        var chart = c3.generate({
            bindto: element.id,
            data: {
                columns: scope.data,
                type : 'pie',
                onclick: function (d) {
                  $state.go('home.search', {
                    'source': 'drug',
                    'type': 'label',
                    'field': 'generic_name',
                    'value': d.name,
                    'limit': 30
                  }); 
                }
            },
            pie: {
                label: {
                    format: function (value) {
                      return value;
                    }
                }
            },
            tooltip: {
                format: {
                    value: function (value) {
                      return value;
                    }
                }
            }
        });

        scope.$watch(function() {
          return scope.data;
        }, function() {
          chart.load({
            columns: scope.data
          });
        });
      }
    };
  }]);
