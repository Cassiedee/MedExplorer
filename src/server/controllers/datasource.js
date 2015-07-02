// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
var http = require("http");
var https = require("https");
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var RateLimiter = require('limiter').RateLimiter;

var limiter = new RateLimiter(1, 250);

var openDbConnections = 0;

var LOG = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        return "[DATASOURCE " + (new Date).toLocaleTimeString() + "]";    
    };

    return {
        log: console.log.bind(console, '%s', timestamp)
    }
})();

var API_KEY = 'PnTZ5GvvuFT6ooEaMtQfuaQZJchizAuKaEr5HZXc';

var options = {
  host: 'api.fda.gov',
  port: 443,
  headers: {
    'Content-Type': 'application/json'
  }
};


exports.getTrendingDrugs = function(callback) {
  //Read trending_drugs into memory
  var db = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
  db.open(function(err, db) {
    openDbConnections++;
    LOG.log('Opened DB connection...' + openDbConnections);
    if(err) {
      LOG.log('Error opening db during getTrendingDrugs: ');
      LOG.log(err);
      db.close();
      openDbConnections--;
      LOG.log('Closed DB connection...' + openDbConnections);
    } 
    else {
      var collection = db.collection('trending_drugs');
      collection.count(function (err, count) {
        if(err) {
          LOG.log('Error on collection.count during getTrendingDrugs: ');
          LOG.log(err);
          db.close();
          openDbConnections--;
          LOG.log('Closed DB connection...' + openDbConnections);
        }
        else if (db === 'undefined') {
          LOG.log("ERROR: db is undefined in getTrendingDrugs!");
        }
        else {
          if (count === 0) {
            fs.readFile('data/trending_drugs.json', 'utf8', function (err, data) {
              try {
                data = JSON.parse(data.toLowerCase());
              }
              catch(err) {
                LOG.log(err);
                LOG.log('getTrendingDrugs data: ');
                LOG.log(data.toLowerCase());
              }
              if(err) {
                callback(500, null, err);
              }
              else {
                callback(200, data, null);
              }
              var array = [];
              if(data && data.prescription) {
                for(var prop in data.prescription) {
                  if(data.prescription.hasOwnProperty(prop)) {
                    data.prescription[prop].type = 'prescription';
                    array.push(data.prescription[prop]);
                  }
                }
              }
              if(data && data.otc) {
                for(var prop in data.otc) {
                  if(data.otc.hasOwnProperty(prop)) {
                    data.otc[prop].type = 'otc';
                    array.push(data.otc[prop]);
                  }
                }
              }
              collection.insert(array);
              db.close();
              openDbConnections--;
              LOG.log('Closed DB connection...' + openDbConnections);
            });
          }
          else if(count !== 0) {
            var results = {};
            collection.find({type: 'otc'}).toArray(function(err, items1) {
              if(err) {
                LOG.log('Error on collection.find otc during getTrendingDrugs: ');
                LOG.log(err);
                db.close();
                openDbConnections--;
                LOG.log('Closed DB connection...' + openDbConnections);
              }
              else {
                results.otc = items1.sort(function(a, b) {
                  return b.count - a.count;
                }).slice(0, 20);
                collection.find({type: 'prescription'}).toArray(function(err, items2) {
                  if(err) {
                    LOG.log('Error on collection.find prescription during getTrendingDrugs: ');
                    LOG.log(err);
                    db.close();
                    openDbConnections--;
                    LOG.log('Closed DB connection...' + openDbConnections);
                  }
                  else {
                    results.prescription = items2.sort(function(a, b) {
                      return b.count - a.count;
                    }).slice(0, 20);
                    callback(200, results, null);
                    db.close();
                    openDbConnections--;
                    LOG.log('Closed DB connection...' + openDbConnections);
                  }
                });
              }
            });
          }
        }
      });
    }
  });
};


exports.setTrendingDrugs = function(body) {
  LOG.log('body.name: ' + body.name);
  body.name = body.name.split('\"').join('');
  var db = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
  db.open(function(err, db) {
    openDbConnections++;
    LOG.log('Opened DB connection...' + openDbConnections);
    if(err) {
      LOG.log('Error opening db during setTrendingDrugs: ');
      LOG.log(err);
      db.close();
      openDbConnections--;
      LOG.log('Closed DB connection...' + openDbConnections);
    }
    else if (db === 'undefined') {
      LOG.log("ERROR: db is undefined during setTrendingDrugs!");
    }
    else {
      var collection = db.collection('trending_drugs');
      collection.findOne({'type': body.type, 'name': body.name}, function(err, item) {
        if(err) {
          LOG.log('Error from collection.findOne during setTrendingDrugs: ');
          LOG.log(err);
          db.close();
          openDbConnections--;
          LOG.log('Closed DB connection...' + openDbConnections);
        }
        else {
          if(!item) {
            collection.insert({'type': body.type, 'name': body.name, 'count': 0}, function(err, data) {
              db.close(); 
              openDbConnections--;
              LOG.log('Closed DB connection...' + openDbConnections);
            });
          }
          collection.update({ 'type': body.type, 'name': body.name }, { $inc: { count: 1 } }, function(err, data) {
            if(err) {
              LOG.log('Error from collection.update during setTrendingDrugs: ');
              LOG.log(err);
            }
            db.close();
            openDbConnections--;
            LOG.log('Closed DB connection...' + openDbConnections);
          });
        }
      });
    }
  });
};

/*
 *  datasource should be drug, device, or food
 *  type should be event, label, or enforcement
 *  this search pass all results into the callback function,
 *  where the value of field matches value for each result
 */
exports.search = function(datasource, type, field, value, terms, limit, callback) {

  options.method = 'GET';
  var fieldArray;
  var valueArray;
  if(terms > 1) {
    try {
      fieldArray = JSON.parse(field);
      valueArray = JSON.parse(value);
    }
    catch(err) {
      console.log('Invalid field/value parameters: ');
      LOG.log(err);
      LOG.log('field: ');
      LOG.log(field);
      LOG.log('value: ');
      LOG.log(value);
      return;
    }

    options.path = '/' + datasource + '/' + type + '.json?api_key=' + API_KEY + '&search=';
    for(var i = 0; i < fieldArray.length && i < valueArray.length; i++) {
      options.path += encodeURIComponent(fieldArray[i] + ':' + valueArray[i]);
      if(i < fieldArray.length - 1 && i < valueArray.length - 1) {
        options.path += '+AND+';
      }
    }
    options.path += '&limit=' + limit;
  }
  else {
    options.path = '/' + datasource + '/' + type + '.json?api_key=' + API_KEY + '&search=' + encodeURIComponent(field) + ':' + encodeURIComponent(value) + '&limit=' + limit;
  }
  LOG.log('options.path: ' + options.path);

  var result = {};
  retrieveFromCache(options.path, function(data){
    result.data = data;
    if(data){
      LOG.log('cache hit!!');
      if(data.resStatusCode === 404) {
        callback(200, null, data);
      }
      else {
        callback(data.resStatusCode, data, null);
      }
    }
    else {
      LOG.log('cache miss!!');
      limiter.removeTokens(1, function() {
        var protocol = options.port === 443 ? https : http;
        var req = protocol.request(options, function(res) {
          var output = '';
          res.setEncoding('utf8');

          res.on('data', function (chunk) {
            output += chunk;
          });

          res.on('end', function() {
            try {
              var obj = JSON.parse(output);
              obj.resStatusCode = res.statusCode === 404 ? 200 : res.statusCode;
              if(obj.resStatusCode === 404) {
                callback(obj.resStatusCode, null, obj);
              }
              else {
                callback(obj.resStatusCode, obj, null);
              }
              //put the object into the cache
              insertIntoCache(options.path, obj);
            } catch(err) {
                LOG.log('Error in search response: ');
                LOG.log(err);
                LOG.log('Data from API: ');
                LOG.log(output);
                exports.search(datasource, type, field, value, terms, limit, callback);
                callback = function(a, b, c) {};
            }
          });
        });

        req.on('error', function(err) {
          LOG.log('Search request error: ');
          LOG.log(err);
          callback(500, null, err);
        });

        req.end();
      });
    }
  });
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
  if(mm < 10) {
    yyyymmdd += '0' + mm;
  }
  else {
    yyyymmdd += '' + mm;
  }
  if(dd < 10) {
    yyyymmdd += '0' + dd;
  }
  else {
    yyyymmdd += '' + dd;
  }
  return yyyymmdd;
}


exports.recentRecalls = function(num, callback) {
  options.method = 'GET';
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var yyyymmdd = dateFormat(yyyy, mm, dd);
  var protocol = options.port === 443 ? https : http;
  var req;

  fetchloop(30, 0);

  function fetchloop(dateRange, counter) {
    var dateRangeQuery = encodeURIComponent('[' + dateDecrement(yyyymmdd, dateRange)) + '+TO+' + 
                         encodeURIComponent(yyyymmdd + ']');
  
    options.path = '/drug/enforcement.json?api_key=' + API_KEY + 
        '&search=report_date:' + dateRangeQuery + '+AND+_exists_:openfda.brand_name&limit=100';
  
  
    LOG.log('options.path: ' + options.path);
    retrieveFromCache(options.path, function(data) {

      if(data) {
        LOG.log('fetchloop cache hit!!');
        resultCheck(data);
      }
      else {
        LOG.log('fetchloop cache miss!!');
        limiter.removeTokens(1, function() {
          req = protocol.request(options, function(res) {
            var output = '';
            res.setEncoding('utf8');
  
            res.on('data', function (chunk) {
              output += chunk;
            });
  
            res.on('end', function() {
              try {
                var obj = JSON.parse(output);
                obj.resStatusCode = res.statusCode === 404 ? 200 : res.statusCode;
                obj.mongoKey = options.path
                insertIntoCache(obj);
                resultCheck(obj);
              }
              catch(err) {
                LOG.log('Error in recentRecalls response: ');
                LOG.log(err);
                LOG.log('Data from API: ');
                LOG.log(output);
                exports.recentRecalls(num, callback);
                callback = function(a, b, c) {};
              }
            });
          });
          req.on('error', function(err) {
            LOG.log('recentRecalls request error: ');
            LOG.log(err);
            callback(500, null, err);
          });
  
          req.end();
        });
      }
    });

    function resultCheck(results) {
      if(counter < 25) {
        if(results.results === undefined || results.results.length < num) {
          fetchloop(dateRange * 1.5, counter + 1);
        }
        else if(results.results.length >= 100) {
          fetchloop(dateRange * 0.75, counter + 1);
        }
        else {
          callback(results.resStatusCode, results.results.sort(function(a, b) {
            return parseInt(b.report_date) - parseInt(a.report_date);
          }).slice(0, num), null);
        }
      }
      else {
        if(results.results) {
          callback(200, null, results.results.sort(function(a, b) {
            return parseInt(b.report_date) - parseInt(a.report_date);
          }).slice(0, num));
        }
        else {
          callback(404, null, 'None found');
        }
      }
    };
  }

};



var twentyFourHoursInMillis = 86400000;

function retrieveFromCache(query, callback) {
  var db = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
  db.open(function(err, db) {
    openDbConnections++;
    LOG.log('Opened DB connection...' + openDbConnections);
    if (err) {
        LOG.log('Error on opening db in retrieveFromCache: ');
        LOG.log(err);
        db.close();
        openDbConnections--;
        LOG.log('Closed DB connection...' + openDbConnections);
    } 
    else if (db === 'undefined') {
      LOG.log("WARNING: db is undefined in retrieveFromCache!");
    }
    else {
      var collection = db.collection("medicine_explorer");
      // Fetch the document
      collection.findOne({ mongoKey: query }, function(err, item) {
        if(err) {
          LOG.log('Error on collection.findOne in retrieveFromCache: ');
          LOG.log(err);
          db.close();
          openDbConnections--;
          LOG.log('Closed DB connection...' + openDbConnections);
        }
        else {
          var data = item;

          //if data is more than 24 hours old clear the cache of all objects
          //that are more than 24 hours old
          if(data && data.insertTime < new Date().getTime() - twentyFourHoursInMillis) {
            LOG.log('Record found but too old');
            cleanCache(collection);
            data = null;
          }
          if(data && !data.resStatusCode) {
            data.resStatusCode = 200;
          }
          callback(data);
          db.close();
          openDbConnections--;
          LOG.log('Closed DB connection...' + openDbConnections);
        }
      });
    }
  });
};

function cleanCache(collection) {
  try {
    //delete all data that is more than 24 hours old
    var twentyFourHoursAgo = new Date().getTime() - twentyFourHoursInMillis;
    var mongoQuery = { insertTime: {$lt:twentyFourHoursAgo} };    
    collection.remove(mongoQuery);
  }
  catch(err) {
    LOG.log('Error in cleanCache: ');
    LOG.log(err);
  }
};

function insertIntoCache(result) {
  if(result.resStatusCode < 400) {
    var db = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
    db.open(function(err, db) {
      openDbConnections++;
      LOG.log('Opened DB connection...' + openDbConnections);
      if(err) {
        LOG.log('Error opening db in insertIntoCache: ');
        LOG.log(err);
        db.close();
        openDbConnections--;
        LOG.log('Closed DB connection...' + openDbConnections);
      }
      else if (db === 'undefined') {
        LOG.log("WARNING: db is undefined in insertIntoCache!");
      }
      else {
        try {
        var collection = db.collection("medicine_explorer");
        result.insertTime = new Date().getTime();
        collection.insert(result);
        db.close();
        openDbConnections--;
        LOG.log('Closed DB connection...' + openDbConnections);
        }
        catch(err) {
          LOG.log('Error while inserting into cache: ');
          LOG.log(err);
        }
      }
    });
  }
};


var functions = {
    'retrieveFromCache' : retrieveFromCache,
    'insertIntoCache' : insertIntoCache,
    'dateDecrement' : dateDecrement
}

module.exports.functions = functions;
