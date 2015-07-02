// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
var http = require("http");
var https = require("https");
var q = require('q');
var RateLimiter = require('limiter').RateLimiter;

var LOG = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        return "[DATASOURCE " + (new Date).toLocaleTimeString() + "]";    
    };

    return {
        log: console.log.bind(console, '%s', timestamp)
    }
})();

var throttle = new RateLimiter(1, 250);

var options = {
  host: 'api.fda.gov',
  port: 443,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

exports.makeRequest = function(path) {
  LOG.log('Requesting path: ' + path);
  return q.Promise(function(resolve, reject) {
    throttle.removeTokens(1, function(err) {
      if(err) {
        reject('Error in limiter: ' + err);
      }
      else {
        options.path = path;
        var protocol = options.port === 443 ? https : http;
        var req = protocol.request(options, function(res) {
          var output = '';
          res.setEncoding('utf8');

          res.on('data', function (chunk) {
            output += chunk;
          });

          res.on('end', function() {
            try {
              var data = JSON.parse(output);
              data.resStatusCode = res.statusCode === 404 ? 200 : res.statusCode;
              data.path = options.path;
              resolve(data);
            } catch(err) {
              reject('Error in request response: ' + err);
            }
          });
        });

        req.on('error', function(err) {
          reject('API request error: ' + err);
        });

        req.end();
      }
    });
  });
};
