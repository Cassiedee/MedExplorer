// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

angular.module('MedExplorer')
  //Capitalize the first character of a string and lowercase the rest.
  .filter('sentence', function() {
    return function(input) {
      if(input) {
        input = input.toLowerCase();
        return input.substring(0,1).toUpperCase() + input.substring(1);
      }
    };
  })
  //Uppercase all characters
  .filter('uppercase', function() {
    return function(input) {
      if(input) {
        return input.toUpperCase();
      }
    };
  })
  //Lowercase all characters
  .filter('lowercase', function() {
    return function(input) {
      if(input) {
        return input.toLowerCase();
      }
    };
  })
  //Uppercase The First Character Of Each Word And Lowercase The Rest
  .filter('title', function() {
    return function(input) {
      if(input) {
        input = input.toLowerCase();
        var words = input.split(' '),
            output = '';
        for(var i in words) {
            output += words[i].substring(0,1).toUpperCase() + words[i].substring(1);
            if(i < words.length - 1) {
              output += ' ';
            }
        }
        return output;
      }
    };
  })
  //Uppercase The First Character Of Each Word But DON'T Touch The REST
  .filter('titlePreserveUpper', function() {
    return function(input) {
      if(input) {
        var words = input.split(' '),
            output = '';
        for(var i in words) {
            output += words[i].substring(0,1).toUpperCase() + words[i].substring(1);
            if(i < words.length - 1) {
              output += ' ';
            }
        }
        return output;
      }
    };
  });
