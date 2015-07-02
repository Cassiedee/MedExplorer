// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
var http = require("http");
var https = require("https");
var fs = require('fs');
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

var throttle = new RateLimiter(1, 1000);

var options = {
  host: 'api.fda.gov',
  port: 443,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

exports.makeRequest = function(path) {
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
}

/*exports.getTrendingDrugs = function(callback) {
  //Read trending_drugs into memory
  var db = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
  db.open(function(err, db) {
    openDbConnections++;
    LOG.log('Opened DB connection...' + openDbConnections);
    if(err) {
      LOG.log('Error opening db during getTrendingDrugs: ');
      LOG.log(err);
      openDbConnections--;
      LOG.log('Closed DB connection...' + openDbConnections);
    } 
    else {
      var collection = db.collection('trending_drugs');
      collection.count(function (err, count) {
        if(err) {
          LOG.log('Error on collection.count during getTrendingDrugs: ');
          LOG.log(err);
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
