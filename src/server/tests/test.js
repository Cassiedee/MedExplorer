// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
var test = require('unit.js');
var rest = require('../routes/REST.js');

var controller = require('../controllers/datasource.js');


describe('REST API Test Suite', function()
{
  it('search_test', function()
  {
    /* configure mock response object */
    var res = {
      responseObj: null
    }; 
    res.json = function(res) {
      this.responseObj = res;
    };
    var req = {
      'query' : {
        'source': 'drug',
        'type': 'label',
        'field': 'openfda.brand_name',
        'value':'Tylenol',
        'limit':30
      }
    };
    rest.functions.search(req,res);
    test.assert.equal(res.status, undefined);
    test.assert.equal(res.response, null);
    test.assert.equal(res.error, undefined);
  });

  it('getTrendingDrugs_test', function()
  {
    /* configure mock response object */
	    var res = {
              responseObj: null
            }; 
	    res.json = function(res) {
              this.responseObj = res;
            };
	    var req = {};
	    rest.functions.getTrendingDrugs(req,res);
	    test.assert.equal(res.status, undefined);
	    test.assert.equal(res.response, null);
	    test.assert.equal(res.error, undefined);
  });

  it('setTrendingDrugs_test', function()
  {
    /* configure mock response object */
    var res = {
      responseObj: null
    }; 
    res.json = function(res) {
      this.responseObj = res;
    };
    res.status = function(code) {
        this.status = code;
        var returnObj = {};
        returnObj.send = function(msg) {}
        return returnObj;
    }

    var req = {
      'body': {'name' : 'Tony'}
    };

    rest.functions.setTrendingDrugs(req,res);
    test.assert.equal(res.status, 200);
    test.assert.equal(res.response, null);
    test.assert.equal(res.error, undefined);
  });

  /* test the fetch loop here (complex) */
  it('recentRecalls_test', function()
  {
	  /* configure mock response object */
	    var res = {
              responseObj :null
            }; 
	    res.json = function(res) {
              this.responseObj = res;
            };
	    var req = {
              'query': {
                'num': 15
              }
            };
	    rest.functions.recentRecalls(req,res);
	    test.assert.equal(res.status, undefined);
	    test.assert.equal(res.response, null);
	    test.assert.equal(res.error, undefined);
  });
});



describe('controllers test suite', function()
{

  it('retriveFromCache_test', function() {
      //just call it to make sure it executes right

      var query = '/drug/label.json?api_key=w41m08ZpKcgzEhSxRYvfa0GzpjVFRTLGRU93gU3g&search=openfda.brand_name:Hello&limit=30';
      var callback = function(data) {};

      controller.retriveFromCache(query,callback);
  });

  it('retriveFromCache_test', function() {
      //just call it to make sure it executes right

      var query = '/drug/label.json?api_key=w41m08ZpKcgzEhSxRYvfa0GzpjVFRTLGRU93gU3g&search=openfda.brand_name:Hello&limit=30';
      var callback = function(data) {};

      controller.insertIntoCache(query,callback);
  });
});
