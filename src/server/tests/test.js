var test = require('unit.js');
var rest = require('../routes/REST.js');


describe('REST API Test Suite', function()
{
  it('hello_test', function()
  {
    /* configure mock response object */
    var res = {responseObj:null}; 
    res.json = function(res) {this.responseObj = res;}

    var req = {'params' : {'name' : 'Eric'}};
    rest.functions.hello(req,res);
    test.assert.equal(res.responseObj.response,"Hello, Eric");
  });
});
