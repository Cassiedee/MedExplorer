// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
var test = require('unit.js');
var rest = require('../routes/REST.js');

var controller = require('../controllers/datasource.js');


describe('REST API Test Suite', function()
{
  it('search test', function()
  {
    // configure mock response object
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


  it('search test - 400 response', function()
  {
    //mock res
    var res = {
      s : 0,
      status : function status(n) {
        this.s = n;
        return {
          j : {},
          json : function json(res) {
            json = res;
          }
        };
      } 
    };

    // mock req
    var req = {
      'query' : {
        'source': 'drug',
        'type': 'label',
        'field': 'openfda.brand_name',
        'value':'Tylenol'
      }
    };

    rest.functions.search(req,res);

    test.assert.equal(res.s, 400);
  });


  /*
  it('recentRecalls test', function()
  {
    var req = {
      'query' : {},
      'body' : {
        'num' : 10
      }
    };

    var res = {
      s : 0,
      status : function status(n) {
        res.s = n;
        return {
          j : {},
          json : function json(res) {
            json = res;
          }
        }
      } 
    };

    rest.functions.recentRecalls(req,res);

    //var currentTime = new Date().getTime(); 

    //while (currentTime + 5000 >= new Date().getTime()) {}

    test.assert.equal(res.s,200);
  });
   */


  it('buildPath test 1', function()
  {
    var datasource = 'drug';
    var type = 'enforcement';
    var field = "[\"openfda.spl_id\",\"status\"]";
    var value = "[\"\\\"a\\\"\",\"Ongoing\"]";
    var terms = 1;
    var limit = 30;

    var expect = "/drug/enforcement.json?api_key=PLACE_API_TOKEN_HERE&search=%5B%22openfda.spl_id%22%2C%22status%22%5D:%5B%22%5C%22a%5C%22%22%2C%22Ongoing%22%5D&limit=30"; 

    var got = rest.functions.buildPath(datasource,type,field,value,terms,limit);

    test.assert.equal(expect,got);
  });

  
  it('buildPath test 2', function()
  {
    var datasource = 'drug';
    var type = 'enforcement';
    var field = "[\"openfda.spl_id\",\"status\"]";
    var value = "[\"\\\"a\\\"\",\"Ongoing\"]";
    var terms = 2;
    var limit = 30;

    var expect = "/drug/enforcement.json?api_key=PLACE_API_TOKEN_HERE&search=openfda.spl_id%3A%22a%22+AND+status%3AOngoing&limit=30";

    var got = rest.functions.buildPath(datasource,type,field,value,terms,limit);

    test.assert.equal(got,expect);
  });

  /*
  it('getTrendingDrugs_test', function()
  {
    // configure mock response object 
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
    // configure mock response object
    var res = {
      responseObj: null
    }; 
    res.json = function(res) {
      this.responseObj = res;
    };
    res.status = function(code) {
        this.status = code;
        var returnObj = {};
        returnObj.send = function(msg) {};
        return returnObj;
    };

    var req = {
      'body': {'name' : 'Tony'}
    };

    rest.functions.setTrendingDrugs(req,res);
    test.assert.equal(res.status, 200);
    test.assert.equal(res.response, null);
    test.assert.equal(res.error, undefined);
  });

  it('recentRecalls_test', function()
  {
	  // configure mock response object
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
   */


  it('dateDecrement test', function() {

      var yyyymmdd = '19941222';
      var num = '365';

      var result = rest.functions.dateDecrement(yyyymmdd,num);

	  test.assert.equal(19931222, result);
  });
});



/*
describe('datasource test suite', function()
{

  it('retriveFromCache_test', function() {
      //call it to make sure it is covered

      var query = '/drug/label.json?api_key=PLACE_API_TOKEN_HERE&search=openfda.brand_name:Hello&limit=30';
      var callback = function(data) {};

      controller.functions.retrieveFromCache(query,callback);
  });

  it('insertIntoCache_test', function() {
      //call it to make sure it is covered

      var query = '/drug/label.json?api_key=PLACE_API_TOKEN_HERE&search=openfda.brand_name:Hello&limit=30';
      var callback = function(data) {};

      controller.functions.insertIntoCache(query,callback);
  });

  it('search test', function() {
      //call it to make sure it is covered
      
      var datasource = 'drug';
      var type = 'enforcement';
      var field = "[\"openfda.spl_id\",\"status\"]";
      var value = "[\"\\\"5b990e3-25c0-415c-9bd1-36532d3634e9\\\"\",\"Ongoing\"]";
      var terms = 2;
      var limit = 30;
      var callback = function(status, data, error) {
      if(status !== 200) {
        console.log({
          'response': data,
          'source': 'search ' + req.query.value,
          'error': error
        });
      }
      res.status(status).json({
        'response': data,
        'source': 'search ' + req.query.value,
        'error': error
      });
    };
      
    controller.search(datasource, type, field, value, terms, limit, callback);
  });

});



describe('cache.js test suite', function()
{
  it (
 */

