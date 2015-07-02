var datasource = require('../controllers/datasource');
var q = require('q');
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

var MongoDb = new Db('test', new Server(process.env.MDB_PORT_27017_TCP_ADDR, 27017));
var twentyFourHoursInMillis = 86400000;

function openConnection() {
  LOG.log('Opening connection to MongoDb...');
  return q.Promise(function(resolve, reject) {
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
  LOG.log('Retreive called...');
  return openConnection().then(function(db) {
    var collection = db.collection(collectionName);
    return q.Promise(function(resolve, reject) {
      try {
      LOG.log('Seeking record...');
      collection.findOne({'path': path}, function(err, record) {
        if(err) {
          LOG.log('Error retrieving ' + path + ' from collection ' + collectionName);
          fetchFromDatasource(path, collection, db).then(function(record) {
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
      console.log('1');
      } catch(err) {
        LOG.log(err);
        reject(err);
      }
    }).then(function(record) {
      db.close();
      LOG.log('Retrieved record successfully!');
      return record; 
    });
  });
}

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
}

function fetchFromDatasource(path, collection) {
  LOG.log('Retreiving from API...');
  return datasource.makeRequest(path).then(function(data) {
    return insertIntoCache(data, collection).then(function() {
      LOG.log('we got here...');
      return data;
    });
  });
}

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
