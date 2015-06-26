// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
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


  it('search_test', function()
  {

    /* configure mock response object */
    var res = {responseObj:null}; 
    res.json = function(res) {this.responseObj = res;}
    
    var req = {'query' : {'source' : 'drug', 'type' : 'label', 'field':'openfda.brand_name','value':'Tylenol','limit':30}};

    rest.functions.search(req,res);

    test.assert.equal(res.status, undefined);
    test.assert.equal(res.response, null);
    test.assert.equal(res.error, undefined);
  });

  it('getTrendingDrugs_test', function()
  {
    /* configure mock response object */
	    var res = {responseObj:null}; 
	    res.json = function(res) {this.responseObj = res;}
	    
	    var req = {};

	    rest.functions.getTrendingDrugs(req,res);

	    test.assert.equal(res.status, undefined);
	    test.assert.equal(res.response, null);
	    test.assert.equal(res.error, undefined);
  });

  it('setTrendingDrugs_test', function()
  {
    /* configure mock response object */
    var res = {responseObj:null}; 
    res.json = function(res) {this.responseObj = res;}

    var req = {'body' : ''};
    rest.functions.setTrendingDrugs(req,res);

    test.assert.equal(res.status, undefined);
    test.assert.equal(res.response, null);
    test.assert.equal(res.error, undefined);
  });

  /* test the fetch loop here (complex) */
  it('recentRecalls_test', function()
  {
	  /* configure mock response object */
	    var res = {responseObj:null}; 
	    res.json = function(res) {this.responseObj = res;}
	    
	    var req = {'query' : {'num':15}};

	    rest.functions.recentRecalls(req,res);

	    test.assert.equal(res.status, undefined);
	    test.assert.equal(res.response, null);
	    test.assert.equal(res.error, undefined);
  });

});
