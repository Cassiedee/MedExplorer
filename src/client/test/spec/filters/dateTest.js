'use strict';

//var test = require('unit.js');


describe('Filter: date', function () {

	var mmddyyyy_slashes;
	
	// load the filter's module
	beforeEach(module('MedExplorer'));
	
	beforeEach(inject(function($injector){
      mmddyyyy_slashes = $injector.get('$filter')('mmddyyyy_slashes');
    }));

	it('has a mmddyyyy_slashes date filter', inject(function($filter) {
		expect($filter('mmddyyyy_slashes')).not.toBeNull();
	}));

	it('convert mmddyyyy_slashes', function () {
		  expect(mmddyyyy_slashes('20150625', null)).toBe('06/25/2015');
	});
	
});
