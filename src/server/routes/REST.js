var express = require('express');
var datasource = require('../controllers/datasource');
var router = express.Router();

var restFunctions = {
  'hello': testFunction,
  'search': search,
  'getTrendingDrugs': getTrendingDrugs,
  'setTrendingDrugs': setTrendingDrugs,
  'recentRecalls': recentRecalls
};

function testFunction(req, res) {
  res.json({
    "response": "Hello, " + req.params.name
  });
};

/*
 * GET REST calls
 */
router.get('/REST/hello/:name', restFunctions.hello);


router.get('/REST/search', search);
function search(req, res) {
  if(!(req.query.datasource
        && req.query.type
        && req.query.field
        && req.query.value)) {
    res.status(400).json({
      'response': null,
      'error': 'Doesn\'t contain the required parameters!'
    });
  }
  else {
    datasource.simpleSearch(req.query.datasource, req.query.type, req.query.field, req.query.value, function(status, data) {
      res.status(200).json({
        'response': data,
        'error': null
      });
    });
  }
};

router.get('/REST/recentRecalls', recentRecalls);
function recentRecalls(req, res) {
  if(!req.query.num)
    req.query.num = 10;
  datasource.recentRecalls(req.query.num, function(status, data, error) {
    res.status(status).json({
      'response': data,
      'error': error
    });
  });
}

router.get('/REST/trendingDrugs', getTrendingDrugs);
function getTrendingDrugs(req, res) {
  datasource.getTrendingDrugs(function(data) {
    res.status(200).json({
      'response': data,
      'error': null
    });
  });
};

router.post('/REST/trendingDrugs', setTrendingDrugs);
function setTrendingDrugs(req, res) {
  datasource.setTrendingDrugs(req.body, function() {
    getTrendingDrugs(req, res);
  });
};

module.exports = router;
module.exports.functions = restFunctions;
