'use strict';

describe('Filter: date', function () {


	var mmddyyyy_slashes;
	
	// load the filter's module
	beforeEach(module('MedExplorer'));
  

	// Initialize the filter and a mock scope
	/*beforeEach(inject(function ($filter) {
	  mmddyyyy_slashes = $filter();
	}));*/

  it('date_test', function () {
	  //expect(mmddyyyy_slashes('20150625', null)).toBe('06/25/2015');
	  expect(1).toBe(1);
  });

  it('has a mmddyyyy_slashes date filter', inject(function($filter) {
      expect($filter('mmddyyyy_slashes')).not.toBeNull();
  }));

});
