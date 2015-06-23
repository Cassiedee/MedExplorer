'use strict';

angular.module('MedExplorer')
  //Capitalize the first character of a string and lowercase the rest.
  .filter('mmddyyyy_slashes', function() {
    return function(input, scope) {
      if(input) {
        return input.substring(4, 6) + '/' + input.substring(6)+ '/' + input.substring(0,4);
      }
    };
  });
