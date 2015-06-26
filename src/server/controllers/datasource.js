// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
var http = require("http");
var https = require("https");
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

exports.getTrendingDrugs = function(callback) {
  //Read trending_drugs into memory
  var db = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
  db.open(function(err, db) {
    var collection = db.collection('trending_drugs');
    collection.count(function (err, count) {
      if (!err && count === 0) {
        fs.readFile('data/trending_drugs.json', 'utf8', function (err, data) {
          data = JSON.parse(data.toLowerCase());
          if(err)
                  callback(500, null, err);
          else
                  callback(200, data, null);
          var array = [];
          for(var prop in data.prescription) {
            data.prescription[prop].type = 'prescription';
            array.push(data.prescription[prop]);
          }
          for(var prop in data.otc) {
            data.otc[prop].type = 'otc';
            array.push(data.otc[prop]);
          }
          collection.insert(array);
          db.close();
        });
      }
      else if(!err & count != 0) {
        var results = {};
        collection.find({type: 'otc'}).toArray(function(err, items1) {
          results.otc = items1.sort(function(a, b) { return b.count - a.count; }).slice(0, 20);
          collection.find({type: 'prescription'}).toArray(function(err, items2) {
            results.prescription = items2.sort(function(a, b) { return b.count - a.count; }).slice(0, 20);
            callback(200, results, null);
          });
        });
      }
    });
  });
};


exports.setTrendingDrugs = function(body) {
  var db = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
  db.open(function(err, db) {
    var collection = db.collection('trending_drugs');
    collection.findOne({'type': body.type, 'name': body.name}, function(err, item) {
      if(!item) {
        collection.insert({'type': body.type, 'name': body.name, 'count': 0});
      }
      collection.update({ 'type': body.type, 'name': body.name }, { $inc: { count: 1 } }, function(err, data) {
        db.close();
      });
    });
  });
};

var API_KEY = 'w41m08ZpKcgzEhSxRYvfa0GzpjVFRTLGRU93gU3g';

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
exports.search = function(datasource, type, field, value, terms, limit, callback) {
	try {
		options.method = 'GET';
		if(terms > 1) {
//			console.log(field);
			field = JSON.parse(field);
//			console.log(value);
			value = JSON.parse(value);

			options.path = '/' + datasource + '/' + type + '.json?api_key=' + API_KEY + '&search=';
			for(var i = 0; i < field.length && i < value.length; i++) {
				options.path += encodeURIComponent(field[i] + ':' + value[i]);
				if(i < field.length - 1 && i < value.length - 1) {
					options.path += '+AND+';
				}
			}
                        options.path += '&limit=' + limit;
		}
		else {
			options.path = '/' + datasource + '/' + type + '.json?api_key=' + API_KEY + '&search=' + encodeURIComponent(field) + ':' + encodeURIComponent(value) + '&limit=' + limit;
		}
		console.log(options.path);

		var result = {};
		retriveFromCache(options.path, function(data){
			result.data = data;
			if(data){
				console.log('cache hit!!');
                                if(data.resStatusCode == 404) {
                                    callback(200, null, data);
                                }
                                else {
                                  callback(data.resStatusCode, data, null);
                                }
			} else {
				console.log('cache miss!!');
				var protocol = options.port == 443 ? https : http;
				var req = protocol.request(options, function(res) {
					var output = '';
					res.setEncoding('utf8');

					res.on('data', function (chunk) {
						output += chunk;
					});

					res.on('end', function() {
						try{
							var obj = JSON.parse(output);

							
							
							
                                                        obj.resStatusCode = res.statusCode == 404 ? 200 : res.statusCode;
							if(obj.resStatusCode == 404) {
								callback(obj.resStatusCode, null, obj);
                                                        }
							else {
								callback(obj.resStatusCode, obj, null);
							}
                                                        //put the object into the cache
                                                        insertIntoCache(options.path, obj);
						}catch(err){
							console.log(err);
						}
					});
				});

				req.on('error', function(err) {
                                        console.log(err);
					callback(500, null, err);
				});

				req.end();
			}
		});
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
			case 4: case 6: case 9: case 11:
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
	var protocol = options.port == 443 ? https : http;
	var req;

        fetchloop(30, 0);
	function fetchloop(dateRange, counter) {
		var recalls = [];
		var dateRangeQuery = encodeURIComponent('[' + dateDecrement(yyyymmdd, dateRange)) + '+TO+' + encodeURIComponent(yyyymmdd + ']');
		options.path = '/drug/enforcement.json?api_key=' + API_KEY + '&search=report_date:' + dateRangeQuery + '+AND+_exists_:openfda.brand_name&limit=100';
                console.log(options.path);
		retriveFromCache(options.path, function(data){
                  if(data) {
                    console.log('fetchloop cache hit!!');
                    resultCheck(data.resStatusCode, data);
                  }
                  else {
                    console.log('fetchloop cache miss!!');
                    req = protocol.request(options, function(res) {
                      var output = '';
                      res.setEncoding('utf8');

                      res.on('data', function (chunk) {
                        output += chunk;
                      });

                      res.on('end', function() {
                        var obj = JSON.parse(output);
                        obj.resStatusCode = res.statusCode == 404 ? 200 : res.statusCode;
                        insertIntoCache(options.path, obj)
                        resultCheck(obj.resStatusCode, obj);
                      });
                    });
                    req.on('error', function(err) {
                      console.log(err);
                      callback(500, null, err);
                    });

                    req.end();
                  }

                  function resultCheck(statusCode, results) {
                    if(results.results) {
                      if(counter < 25) {
                        if(results.results.length < num) {
                          fetchloop(dateRange * 1.5, counter + 1);
                        }
                        else if(results.results.length >= 100) {
                          fetchloop(dateRange * 0.75, counter + 1);
                        }
                        else {
                          callback(results.resStatusCode, results.results.sort(function(a, b) {return parseInt(b.report_date) - parseInt(a.report_date);}).slice(0, num), null);
                        }
                      }
                      else {
                        if(results.results) {
                          callback(200, null, results.results.sort(function(a, b) {return parseInt(b.report_date) - parseInt(a.report_date);}).slice(0, num));
                        }
                        else {
                          callback(404, null, 'None found');
                        }
                      }
                    }
                  };
		});
	};
}

var twentyFourHoursInMillis = 86400000;

function retriveFromCache(query, callback){
//	console.log(query);
	var db = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
	db.open(function(err, db) {
		var collection = db.collection("medicine_explorer");
		// Fetch the document
                console.log(query);
		collection.findOne({ mongoKey: query }, function(err, item) {
//			console.log( JSON.stringify(item).substring(0,100) + " Item");
//			console.log("Item: ");
			var data = item;

			//if data is more than 24 hours old clear the cache of all objects
			//that are more than 24 hours old
			if(data && data.insertTime.getTime() < new Date().getTime() - twentyFourHoursInMillis){
                                console.log('Record found but too old');
				cleanCache(db);
                                data = null;
			}
			if(data){
				if(!data.resStatusCode){
					data.resStatusCode = 200;
				}
			}
			callback(data);
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
        if(result.resStatusCode < 400) {
          var db = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
          db.open(function(err, db) {
                  var collection = db.collection("medicine_explorer");

                  result.insertTime = new Date();
                  result.mongoKey = query;
                  collection.insert(result);
                  db.close();
          });
        }
}
