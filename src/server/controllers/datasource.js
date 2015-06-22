var http = require("http");
var https = require("https");
var fs = require('fs');


exports.getTrendingDrugs = function(callback) {
  //Read trending_drugs into memory
  fs.readFile('data/trending_drugs.json', 'utf8', function (err, data) {
    if(err)
      callback(err);
    else
    callback(JSON.parse(data));
  });
};


exports.setTrendingDrugs = function(data, callback) {
  //Write trending_drugs 
  fs.writeFile('data/trending_drugs.json', JSON.stringify(data), function(err) {
    if(err)
      callback(err);
    else
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

/*
 *  datasource should be drug, device, or food
 *  type should be event, label, or enforcement
 *  this search pass all results into the callback funciton,
 *    where the value of field matches value for each result
 */
exports.simpleSearch = function(datasource, type, field, value, callback) {
    options.method = 'GET';
    options.path = '/' + datasource + '/' + type + '.json?api_key=' + API_KEY + '&search=' + encodeURIComponent(field) + ':' + encodeURIComponent(value) + '&limit=25';
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
