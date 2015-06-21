var http = require("http");
var https = require("https");
var fs = require('fs');


exports.getTrendingDrugs = function(callback) {
  //Read trending_drugs into memory
  fs.readFile('data/trending_drugs.json', 'utf8', function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    callback(JSON.parse(data));
  });
};


exports.setTrendingDrugs = function(data, callback) {
  //Write trending_drugs 
  fs.writeFile('data/trending_drugs.json', JSON.stringify(data), function(err) {
    if(err)
      err;
    callback();
  });
};

var API_KEY = 'yTYnUvdcecwjxEgbECMYviNmByhA7bhZi8OgAUKK';

var options = {
    host: 'api.fda.gov',
    port: 443,
    headers: {
        'Content-Type': 'application/json'
    }
};

exports.simpleSearch = function(field, value, callback) {
    options.path = '/drug/event.json?api_key=' + API_KEY + '&search=' + encodeURIComponent(field) + ':"' + encodeURIComponent(value) + '"&limit=1';
    options.method = 'GET';

    console.log(options.path);
    var protocol = options.port == 443 ? https : http;
    var req = protocol.request(options, function(res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            callback(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
      req.send('error: ' + err.message);
    });

    req.end();
};
