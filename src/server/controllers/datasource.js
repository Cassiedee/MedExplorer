var http = require("http");
var https = require("https");
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ReplSetServers = require('mongodb').ReplSetServers;
var ObjectID = require('mongodb').ObjectID;
var Binary = require('mongodb').Binary;
var GridStore = require('mongodb').GridStore;
var Grid = require('mongodb').Grid;
var Code = require('mongodb').Code;
//var BSON = require('mongodb').pure().BSON;
var assert = require('assert');

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
exports.search = function(datasource, type, field, value, terms, callback) {
	try {
		options.method = 'GET';
		if(terms > 1) {
			console.log(field);
			field = JSON.parse(field);
			console.log(value);
			value = JSON.parse(value);

			options.path = '/' + datasource + '/' + type + '.json?api_key=' + API_KEY + '&search=';
			for(var i = 0; i < field.length && i < value.length; i++) {
				options.path += encodeURIComponent(field[i] + ':' + value[i]);
				if(i < field.length - 1 && i < value.length - 1) {
					options.path += '+AND+';
				}
			}
		}
		else {
			options.path = '/' + datasource + '/' + type + '.json?api_key=' + API_KEY + '&search=' + encodeURIComponent(field) + ':' + encodeURIComponent(value) + '&limit=25';
		}
		console.log(options.path);

		var result;
		retriveFromCache(options.path, result);
		if(result){
			console.log('cache hit!!')
			var status = 200;
			callback(status, result)
		} else {
			var protocol = options.port == 443 ? https : http;
			var req = protocol.request(options, function(res) {
				var output = '';
				res.setEncoding('utf8');

				res.on('data', function (chunk) {
					output += chunk;
				});

				res.on('end', function() {
					var obj = JSON.parse(output);
					//put the object into the cache
					insertIntoCache(options.path, obj);
					if(res.statusCode == 404) {
						callback(200, null, obj);
					}
					else {
						callback(res.statusCode, obj, null);
					}
				});
			});

			req.on('error', function(err) {
				req.send('error: ' + err.message);
			});

			req.end();
		}
	} catch(err) {
		console.log(err);
	}

};

function dateDecrement(yyyymmdd, num) {
  var yyyy = parseInt(yyyymmdd.substring(0, 4));
  var mm = parseInt(yyyymmdd.substring(4, 6));
  var dd = parseInt(yyyymmdd.substring(6, 8));
  num = Math.floor(num);
  for(var i = 0; i < num; i++) {
    dd--;
    if(dd < 1) {
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
  }
  return dateFormat(yyyy, mm, dd);
}

function dateFormat(yyyy, mm, dd) {
  var yyyymmdd = '' + yyyy;
  if(mm < 10)
    yyyymmdd += '0' + mm;
  else
    yyyymmdd += '' + mm;
  if(dd < 10)
    yyyymmdd += '0' + dd;
  else
    yyyymmdd += '' + dd;
  return yyyymmdd;
}

exports.recentRecalls = function(num, callback) {
  options.method = 'GET';
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var yyyymmdd = dateFormat(yyyy, mm, dd);
  var dateRange = 30;
  var protocol = options.port == 443 ? https : http;
  var req;

  function fetchloop() {
    var recalls = [];
    var dateRangeQuery = encodeURIComponent('[' + dateDecrement(yyyymmdd, dateRange)) + '+TO+' + encodeURIComponent(yyyymmdd + ']');
    options.path = '/drug/enforcement.json?api_key=' + API_KEY + '&search=report_date:' + dateRangeQuery + '+AND+_exists_:openfda.brand_name&limit=100';
    console.log(dateRangeQuery + ' ' + dateRange);
    req = protocol.request(options, function(res) {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            if(obj.results)
              recalls = obj.results;
            if(recalls.length < num) {
              dateRange *= 1.5;
              fetchloop();
            }
            else if(recalls.length >= 100) {
              dateRange *= 0.75;
              fetchloop();
            }
            else
              callback(res.statusCode, recalls.sort(function(a, b) {return parseInt(b.report_date) - parseInt(a.report_date);}).slice(0, num), null);
        });
    });
    req.on('error', function(err) {
      req.callback(res.statusCode, null, err);
    });

    req.end();
  }

  fetchloop();
}

var twentyFourHoursInMillis = 86400000;

function retriveFromCache(query, result){
	var db = new Db('test', new Server('localhost', 27017));
	db.open(function(err, db) {
		var collection = db.collection("medicine_explorer");

		// Fetch the document
		collection.findOne({ mongoKey: query }, function(err, item) {
			var data = item;

			//if data is more than 24 hours old clear the cache of all objects
			//that are more than 24 hours old
			if(data && data.insertTime.getTime() < new Date().getTime() - twentyFourHoursInMillis){
				cleanCache(db);
				data = null;
			}

			result.data = data;
			db.close();
		});
});
	
}

function cleanCache(db){
	//delete all data that is more than 24 hours old
	var twentyFourHoursAgo = new Date(new Date().getTime() - twentyFourHoursInMillis);
	var mongoQuery = { insertTime: {$lt:twentyFourHoursAgo} };	    
	db.remove(mongoQuery);
}

function insertIntoCache(query, result){
	var db = new Db('test', new Server('localhost', 27017));
	db.open(function(err, db) {
		var collection = db.collection("medicine_explorer");

		result.insertTime = new Date();
		result.mongoKey = query;
		collection.insert(result);
		db.close();
	});
}
