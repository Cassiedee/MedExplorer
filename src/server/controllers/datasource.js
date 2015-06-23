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

function dateDecrement(yyyymmdd) {
  var yyyy = parseInt(yyyymmdd.substring(0,4));
  var mm = parseInt(yyyymmdd.substring(4,5));
  var dd = parseInt(yyyymmdd.substring(5,7));
  dd--;
  if(dd === 0) {
    mm--;
    switch(mm) {
      case 2:
        dd = 28;
        break;
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        dd = 31;
        break;
      case 4: case 6: case 7: case 9: case 11:
        dd = 30;
        break;
      default:
        mm = 12;
        dd = 31;
        yyyy--;
    }
  }
  var yyyymmdd = '' + yyyy;
  if(mm < 10)
    yyyymmdd +='0' + mm;
  else
    yyyymmdd += '' + mm;
  if(dd < 10)
    yyyymmdd += '0' + dd;
  else
    yyyymmdd += '' + dd;
  return yyyymmdd;
}

exports.recentRecalls = function(num, callback) {
  var recalls = [];
  options.method = 'GET';
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var yyyymmdd = yyyy + '' + mm + '' + dd;
  var protocol = options.port == 443 ? https : http;
  var req;

  function fetchloop() {
    var dateRange = encodeURIComponent('[' + dateDecrement(yyyymmdd)) + '+TO+' + encodeURIComponent(yyyymmdd + ']');
    options.path = '/drug/enforcement.json?api_key=' + API_KEY + '&search=report_date:' + dateRange + '+AND+_exists_:openfda.brand_name&limit=100';
    console.log(options.path);
    req = protocol.request(options, function(res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            if(obj.results)
              recalls = recalls.concat(obj.results.sort(function(a, b) {return parseInt(a.report_data) - parseInt(b.report_data);}));
            if(recalls.length < 20) {
              yyyymmdd = dateDecrement(yyyymmdd);
              fetchloop();
            }
            else
              callback(res.statusCode, recalls.slice(0, num), null);
        });
    });
    req.on('error', function(err) {
      req.callback(res.statusCode, null, err);
    });

    req.end();
  }

  fetchloop();
}
