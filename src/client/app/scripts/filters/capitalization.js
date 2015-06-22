angular.module('MedExplorer')
  .filter('sentence', function() {
    return function(input, scope) {
      if(input) {
        input = input.toLowerCase();
        return input.substring(0,1).toUpperCase() + input.substring(1);
      }
    };
  })
  .filter('uppercase', function() {
    return function(input, scope) {
      if(input)
        return input.toUpperCase();
    };
  })
  .filter('lowercase', function() {
    return function(input, scope) {
      if(input)
        return input.toLowerCase();
    };
  })
  .filter('title', function() {
    return function(input, scope) {
      if(input) {
        input = input.toLowerCase();
        var words = input.split(' '),
            output = '';
        for(i in words) {
            output += words[i].substring(0,1).toUpperCase() + words[i].substring(1);
            if(i < words.length - 1)
              output += ' ';
        }
        return output;
      }
    };
  })
  .filter('title-preserve-upper', function() {
    return function(input, scope) {
      if(input) {
        var words = input.split(' '),
            output = '';
        for(i in words) {
            output += words[i].substring(0,1).toUpperCase() + words[i].substring(1);
            if(i < words.length - 1)
              output += ' ';
        }
        return output;
      }
    };
  });
