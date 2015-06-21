var express = require('express');
var datasource = require('../controllers/datasource');
var router = express.Router();

var restFunctions = {};

restFunctions.hello = function(req, res) {
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
  if(!req.query.field || !req.query.value) {
    console.log('No field or value found!');
    return;
  }
  datasource.simplesearch(req.query.field, req.query.value, function(status, data) {
    res.send(status + '<br>' + JSON.stringify(data));
  });
};

router.get('/REST/trendingDrugs', getTrendingDrugs);
function getTrendingDrugs(req, res) {
  datasource.getTrendingDrugs(function(data) {
    res.json(data);
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
