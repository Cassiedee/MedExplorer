var express = require('express');
var datasource = require('../controllers/datasource');
var router = express.Router();

/*
 * GET REST calls
 */
router.get('/REST/hello/:name', hello);
function hello(req, res) {
  res.json({
    "response": "Hello, " + req.params.name
  });
}

router.get('/REST/search', search);
function search(req, res) {
  if(!req.query.field || !req.query.value) {
    console.log('No field or value found!');
    return;
  }
  datasource.simplesearch(req.query.field, req.query.value, function(status, data) {
    res.send(status + '<br>' + JSON.stringify(data));
  });
}

module.exports = router;
