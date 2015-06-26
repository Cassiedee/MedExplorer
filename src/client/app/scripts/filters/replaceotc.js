// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  .filter('replaceOTC', function() {
    return function(input) {
      if(input) {
        return input.replace('otc', 'OTC').replace('Otc', 'OTC');
      }
    };
  });
