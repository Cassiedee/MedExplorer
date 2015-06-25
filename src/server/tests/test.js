var test = require('unit.js');
var rest = require('../routes/REST.js');


describe('REST API Test Suite', function()
{
  it('hello_test', function()
  {
    /* configure mock response object */
    var res = {responseObj:null}; 
    res.json = function(res) {this.responseObj = res;}

    //var req = {'params' : {'name' : 'Eric'}};

    var req = {'query' : {'type' : 'typehere', 'field':'fieldhere','value':123,'limit':123}};

    rest.functions.search(req,res);


    test.assert.equal(req.responseObj.response,"Hello, Eric");
    //expect(res.responseObj.response).toEqual("Hello, Eric");
  });


  it('search_test', function()
  {
    /* configure mock response object */
    var res = {responseObj:null}; 
    res.json = function(res) {this.responseObj = res;}

    var req = {'params' : {'name' : 'Eric'}};
    rest.functions.hello(req,res);


    test.assert.equal(res.responseObj.response,"Hello, Eric");
  });

  it('getTrendingDrugs_test', function()
  {
    /* configure mock response object */
    var res = {responseObj:null}; 
    res.json = function(res) {this.responseObj = res;}

    var req = {'params' : {'name' : 'Eric'}};
    rest.functions.hello(req,res);
    test.assert.equal(res.responseObj.response,"Hello, Eric");

    //expect(res.responseObj.response).toEqual("Hello, Eric");
  });

  it('setTrendingDrugs_test', function()
  {
    /* configure mock response object */
    var res = {responseObj:null}; 
    res.json = function(res) {this.responseObj = res;}

    var req = {'params' : {'name' : 'Eric'}};
    rest.functions.hello(req,res);
    test.assert.equal(res.responseObj.response,"Hello, Eric");
  });

  /* test the fetch loop here (complex) */
  it('recentRecalls_test', function()
  {
    /* configure mock response object */
    var res = {responseObj:null}; 
    res.json = function(res) {this.responseObj = res;}

    var req = {'params' : {'name' : 'Eric'}};
    rest.functions.hello(req,res);
    test.assert.equal(res.responseObj.response,"Hello, Eric");
  });

});
