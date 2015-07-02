// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
var express = require('express');
var datasource = require('../controllers/datasource');
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

var restFunctions = {
  'search': search,
  'getTrendingDrugs': getTrendingDrugs,
  'setTrendingDrugs': setTrendingDrugs,
  'recentRecalls': recentRecalls
};

/*
 * GET REST calls
 */
router.get('/REST/search', search);
function search(req, res) {
  try {
    if(!(req.query.source
          && req.query.type
          && req.query.field
          && req.query.value
          && req.query.limit)) {
      res.status(400).json({
        'response': null,
        'source': 'search ' + req.query.value,
        'error': 'Doesn\'t contain the required parameters!'
      });
    }
    else {
      datasource.search(req.query.source, req.query.type, req.query.field, req.query.value, req.query.terms, req.query.limit, function(status, data, error) {
        if(status !== 200) {
          LOG.log({
            'response': data,
            'source': 'search ' + req.query.value,
            'error': error
          });
        }
        res.status(status).json({
          'response': data,
          'source': 'search ' + req.query.value,
          'error': error
        });
      });
    }
  }
  catch(err) {
    LOG.log('Error in /REST/search : ');
    LOG.log(err);
  }
};

router.get('/REST/recentRecalls', recentRecalls);
function recentRecalls(req, res) {
  try {
    if(!req.query.num) {
      req.query.num = 10;
    }
    datasource.recentRecalls(req.query.num, function(status, data, error) {
      res.status(status).json({
        'response': data,
        'source': 'recentRecalls',
        'error': error
      });
    });
  }
  catch(err) {
    LOG.log('Error in /REST/recentRecalls : ');
    LOG.log(err);
  }
}

/* test that trending drugs are returned */
router.get('/REST/trendingDrugs', getTrendingDrugs);
function getTrendingDrugs(req, res) {
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

/* test that trending drugs are set correctly */
router.post('/REST/trendingDrugs', setTrendingDrugs);
function setTrendingDrugs(req, res) {
  try {
    datasource.setTrendingDrugs(req.body, function() {});
    res.status(200).send('Done.');
  }
  catch(err) {
    LOG.log('Error in post /REST/trendingDrugs : ');
    LOG.log(err);
  }
};

module.exports = router;
module.exports.functions = restFunctions;
