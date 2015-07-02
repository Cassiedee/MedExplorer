var datasource = require('../controllers/datasource');
var q = require('q');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var LOG = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        return "[CACHE " + (new Date).toLocaleTimeString() + "]";    
    };

    return {
        log: console.log.bind(console, '%s', timestamp)
    }
})();

var twentyFourHoursInMillis = 86400000;

(function checkForTrendingDrugs(collectionName) {
  LOG.log('Retrieve called...');
  return openConnection().then(function(db) {
    var collection = db.collection(collectionName);
    return q.Promise(function(resolve, reject) {
      LOG.log('Checking for trending_drugs in collection...');
        collection.count(function(err, count) {
        if(err) {
          reject('Error on collection.count: ' + err);
        }
        else if(count === 0) {
          LOG.log('No trending drugs found');
          fs.readFile('data/trending_drugs.json', 'utf8', function(err, data) {
            if(err) {
              reject('Error reading trending_drugs.json: ' + err);
            }
            else {
              LOG.log('Read in data/trending_drugs.json');
              try {
                data = JSON.parse(data.toLowerCase());
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
                LOG.log('Intialized trending drugs successfully!');
                resolve();
              }
              catch(err) {
                reject('Error parsing trending_drugs.json: ' + err);
              }
            }
          });
        }
        else {
          resolve();
          LOG.log('Found trending drugs in collection!');
        }
      });
    }).then(function(record) {
      db.close();
      LOG.log('Closed connection to MongoDb.');
    });
  });
})('trending_drugs');

function openConnection() {
  LOG.log('Opening connection to MongoDb...');
  return q.Promise(function(resolve, reject) {
    var MongoDb = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
    MongoDb.open(function(err, db) {
      if(err) {
        LOG.log('Error opening database connection!');
        LOG.log(err);
        reject(err);
      }
      else {
        LOG.log('Connection opened...');
        resolve(db);
      }
    });
  });
};

exports.retrieve = function(path, collectionName) {
  LOG.log('Retrieve called...');
  return openConnection().then(function(db) {
    var collection = db.collection(collectionName);
    return q.Promise(function(resolve, reject) {
      LOG.log('Seeking record...');
      collection.findOne({'path': path}, function(err, record) {
        if(err) {
          LOG.log('Error retrieving ' + path + ' from collection ' + collectionName);
          return fetchFromDatasource(path, collection, db).then(function(record) {
            resolve(record);
          }, function(err) {
            reject(err); 
          });
        }
        else {
          LOG.log('Checking record date...');
          checkRecordDate(record, path, collection).then(function(record) {
            resolve(record);
          }, function(err) {
            reject(err); 
          });
        }
      });
    }).then(function(record) {
      db.close();
      LOG.log('Retrieved record successfully!');
      LOG.log('Closed connection to MongoDb.');
      return record; 
    });
  });
};

function checkRecordDate(record, path, collection) {
  if(!record) {
    LOG.log('Record not found...');
    return fetchFromDatasource(path, collection).then(function(data) {
      return data;
    });
  }
  else if(record && record.insertTime < new Date().getTime() - twentyFourHoursInMillis) {
    LOG.log('Record found but too old');
    return cleanCache(collection).then(function() {
      return fetchFromDatasource(path, collection).then(function(data) {
        return data;
      });
    });
  }
  else {
    LOG.log('Record found in cache is up to date...');
    return q.fcall(function() {
      return record;
    });
  }
};

function fetchFromDatasource(path, collection) {
  LOG.log('Retrieving from API...');
  return datasource.makeRequest(path).then(function(data) {
    LOG.log('Succesfully pulled some data from the API...');
    return insertIntoCache(data, collection).then(function() {
      return data;
    });
  });
};

function insertIntoCache(record, collection) {
  return q.Promise(function(resolve, reject) {
    LOG.log('Inserting into cache...');
    if(record.resStatusCode < 400) {
      try {
        record.insertTime = new Date().getTime();
        collection.insert(record);
        LOG.log('Successfully inserted!');
        resolve();
      }
      catch(err) {
        reject('Error while inserting into cache: ' + err);
      }
    }
    else {
      reject('Trying to cache an error');
    }
  });
};

function cleanCache(collection, db) {
  return q.Promise(function(resolve, reject) {
    try {
      //delete all data that is more than 24 hours old
      var twentyFourHoursAgo = new Date().getTime() - twentyFourHoursInMillis;
      collection.remove({
        'insertTime': {
          '$lt': twentyFourHoursAgo
        }
      });
      resolve();
    }
    catch(err) {
      reject('Error while cleaning cache: ' + err);
    }
  });
};

exports.getTrendingDrugs = function(collectionName) {
  LOG.log('Retrieve trending drugs called...');
  return openConnection().then(function(db) {
    var collection = db.collection(collectionName);
    return q.Promise(function(resolve, reject) {
      var results = {};
      collection.find({type: 'otc'}).toArray(function(err, otc) {
        if(err) {
          reject('Error retrieving trending otc drugs from collection: ' + err);
        }
        else {
          results.otc = otc.sort(function(a, b) {
            return b.count - a.count;
          }).slice(0, 20);
          collection.find({type: 'prescription'}).toArray(function(err, prescription) {
            if(err) {
              reject('Error retrieving trending prescription drugs from collection: ' + err);
            }
            else {
              results.prescription = prescription.sort(function(a, b) {
                return b.count - a.count;
              }).slice(0, 20);
              resolve(results);
            }
          });
        }
      });
    }).then(function(records) {
      db.close();
      LOG.log('Retrieved records successfully!');
      LOG.log('Closed connection to MongoDb.');
      return records; 
    });
  });
};

exports.setTrendingDrugs = function(body, collectionName) {
  LOG.log('Set trending drugs called...');
  return openConnection().then(function(db) {
    var collection = db.collection(collectionName);
    return q.Promise(function(resolve, reject) {
      collection.findOne({'type': body.type, 'name': body.name}, function(err, item) {
        if(err) {
          reject('Error checking for already existing trending drug: ' + err);
        }
        else {
          if(!item) {
            collection.insert({'type': body.type, 'name': body.name, 'count': 1}, function(err) {
              if(err) {
                reject('Error initializing new trending drug: ' + err);
              }
            });
          }
          collection.update({'type': body.type, 'name': body.name}, {'$inc': { 'count': 1}}, function(err, data) {
            if(err) {
              reject('Error updating trending drug: ' + err);
            }
            else {
              resolve();
            }
          });
        }
      });
    }).then(function() {
      db.close();
      LOG.log('Updated record successfully!');
      LOG.log('Closed connection to MongoDb.');
    });
  });
};
