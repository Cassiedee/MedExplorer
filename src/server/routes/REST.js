var express = require('express');
var datasource = require('../controllers/datasource');
var router = express.Router();

var restFunctions = {
  'hello': testFunction,
  'search': search,
  'getTrendingDrugs': getTrendingDrugs,
  'setTrendingDrugs': setTrendingDrugs
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
    res.status(200).json({
      'response': 'Done.',
      'error':null
    });
  });
};

module.exports = router;
module.exports.functions = restFunctions;
