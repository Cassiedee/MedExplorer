'use strict';

describe('Directive: baseballCard', function () {

	var baseballCard, element, scope;
	
	// load the filter's module
	beforeEach(module('MedExplorer'));

	beforeEach(inject(function($rootScope, $compile) {
	    scope = $rootScope.$new();

	    element =
	        '<div></div>';

	    scope.size = 100;

	    element = $compile(element)(scope);
	    scope.$digest();
	  }));
	
	it('should check validity on init', function() {
        expect(element.div).not.toBeNull();
    });
	
});
