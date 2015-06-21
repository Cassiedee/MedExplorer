var express = require('express');
var router = express.Router();

/*
 * GET REST calls
 */
router.get('/REST/hello/:name', function(req, res) {
  res.json({
    "response": "Hello, " + req.params.name
  });
});

module.exports = router;
