// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
var express = require('express');
var datasource = require('../controllers/datasource');
var router = express.Router();

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
  if(!(req.query.source
        && req.query.type
        && req.query.field
        && req.query.value
        && req.query.limit)) {
    res.status(400).json({
      'response': null,
      'error': 'Doesn\'t contain the required parameters!'
    });
  }
  else {

    datasource.search(req.query.source, req.query.type, req.query.field, req.query.value, req.query.terms, req.query.limit, function(status, data, error) {
      if(status !== 200) {
        console.log({
          'response': data,
          'error': error
        });
      }
      res.status(status).json({
        'response': data,
        'error': error
      });
    });
  }
};

router.get('/REST/recentRecalls', recentRecalls);
function recentRecalls(req, res) {
  if(!req.query.num) {
    req.query.num = 10;
  }
  datasource.recentRecalls(req.query.num, function(status, data, error) {
    res.status(status).json({
      'response': data,
      'error': error
    });
  });
}

/* test that trending drugs are returned */
router.get('/REST/trendingDrugs', getTrendingDrugs);
function getTrendingDrugs(req, res) {
  datasource.getTrendingDrugs(function(status, data, error) {
    res.status(status).json({
      'response': data,
      'error': error
    });
  });
};

/* test that trending drugs are set correctly */
router.post('/REST/trendingDrugs', setTrendingDrugs);
function setTrendingDrugs(req, res) {
  datasource.setTrendingDrugs(req.body, function() {});
  res.status(200).send('Done.');
};

module.exports = router;
module.exports.functions = restFunctions;
