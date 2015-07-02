// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
var express = require('express');
var cache = require('../controllers/cache');
var router = express.Router();

var LOG = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        return "[REST " + (new Date).toLocaleTimeString() + "]";    
    };

    return {
        log: console.log.bind(console, '%s', timestamp)
    }
})();

var API_KEY = 'PnTZ5GvvuFT6ooEaMtQfuaQZJchizAuKaEr5HZXc';

/*
 * GET REST calls
 */
exports.search = function (req, res) {
  if(!(req.query.source && req.query.type && req.query.field && req.query.value && req.query.limit)) {
    res.status(400).json({
      'response': null,
      'source': 'search ' + req.query.value,
      'error': 'Doesn\'t contain the required parameters!'
    });
  }
  else {
    var path = buildPath(req.query.source, req.query.type, req.query.field, req.query.value, req.query.limit);
    cache.retrieve(path, 'medicine_explorer').then(function(status, data) {
      res.status(status).json({
        'response': data,
        'source': 'search ' + req.query.value
      });
    }, function(status, err) {
      var JSON = {
        'source': 'search ' + req.query.value,
        'error': err
      };
      res.status(status).json(JSON);
      LOG.log(JSON);
    });
  }
};
router.get('/REST/search', exports.search);



exports.recentRecalls = function(req, res) {
  LOG.log('Recent recalls called');
  if(!req.query.num) {
    req.query.num = 10;
  }
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var yyyymmdd = dateFormat(yyyy, mm, dd);
  var dateRangeQuery;
  var path;
  var i = 0;

  loop(30);
  
  function loop(dateRange) {
    LOG.log('loop iteration: ' + i);
    i++;
    dateRangeQuery = encodeURIComponent('[' + dateDecrement(yyyymmdd, dateRange))
      + '+TO+' + encodeURIComponent(yyyymmdd + ']');
    path = '/drug/enforcement.json?api_key=' + API_KEY
      + '&search=report_date:' + dateRangeQuery + '+AND+_exists_:openfda.brand_name&limit=100';

    LOG.log('Retrieving ' + path + ' ...');
    cache.retrieve(path, 'medicine_explorer').then(function(data) {
      if(i >= 25) {
        if(data.results) {
          respond(200, {
            'results': data.results.sort(function(a, b) {
                return parseInt(b.report_date) - parseInt(a.report_date);
              }).slice(0, req.body.num)
          });
        }
        else {
          respond(200, data);
        }
      }
      else {
        if(data.results === undefined || data.results.length < req.query.num) {
          LOG.log('Short data set!');
          loop(dateRange * 1.5);
        }
        else if(data.results.length >= 100) {
          console.log('Long data set!');
          loop(dateRange * 0.75);
        }
        else {
          LOG.log('Goldilocks data set!');
          respond(200, {
            'results': data.results.sort(function(a, b) {
                return parseInt(b.report_date) - parseInt(a.report_date);
              }).slice(0, req.body.num)
          });
        }
      }
    }, function(err) {
      var JSON = {
        'source': 'recentRecalls',
        'error': err
      };
      res.status(500).json(JSON);
      LOG.log(JSON);
    });
  };

  function respond(status, data) {
    LOG.log('Response sent!');
    res.status(status).json({
      'response': data,
      'source': 'recentRecalls'
    });
  };
};
router.get('/REST/recentRecalls', exports.recentRecalls);



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

/* test that trending drugs are returned */
/*router.get('/REST/trendingDrugs', exports.getTrendingDrugs);
exports.getTrendingDrugs = function(req, res) {
  try {
    datasource.getTrendingDrugs(function(status, data, error) {
      res.status(status).json({
        'response': data,
        'source': 'trendingDrugs',
        'error': error
      });
    });
  }
  catch(err) {
    LOG.log('Error in get /REST/trendingDrugs : ');
    LOG.log(err);
  }
};

/* test that trending drugs are set correctly 
router.post('/REST/trendingDrugs', function (req, res) {
  try {
    datasource.setTrendingDrugs(req.body, function() {});
    res.status(200).send('Done.');
  }
  catch(err) {
    LOG.log('Error in post /REST/trendingDrugs : ');
    LOG.log(err);
  }
});*/

function buildPath(datasource, type, field, value, terms, limit) {
  var path;
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

    path = '/' + datasource + '/' + type + '.json?api_key=' + API_KEY + '&search=';
    for(var i = 0; i < fieldArray.length && i < valueArray.length; i++) {
      path += encodeURIComponent(fieldArray[i] + ':' + valueArray[i]);
      if(i < fieldArray.length - 1 && i < valueArray.length - 1) {
        path += '+AND+';
      }
    }
    path += '&limit=' + limit;
  }
  else {
    path = '/' + datasource + '/' + type + '.json?api_key=' + API_KEY + '&search=' + encodeURIComponent(field) + ':' + encodeURIComponent(value) + '&limit=' + limit;
  }
  return path;
};

module.exports = router;
