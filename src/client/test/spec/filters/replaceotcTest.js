'use strict';

describe('Filter: replaceotc', function () {

	var replaceOTC;
	
	// load the filter's module
	beforeEach(module('MedExplorer'));
	
	beforeEach(inject(function($injector){
		replaceOTC = $injector.get('$filter')('replaceOTC');
    }));

	it('has a replaceOTC filter', inject(function($filter) {
		expect($filter('replaceOTC')).not.toBeNull();
	}));

	it('convert replaceOTC', function () {
		  expect(replaceOTC('otc')).toBe('OTC');
		  expect(replaceOTC('Otc')).toBe('OTC');
	});
	
});
