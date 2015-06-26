// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Directive: scrollableDiv', function () {

	var scrollableDiv, element, scope;
	
	// load the filter's module
	beforeEach(module('MedExplorer'));

	beforeEach(inject(function($rootScope, $compile) {
	    scope = $rootScope.$new();

	    element =
	        '<div style="margin-top:0px;" class="jumbotron-title recall-background" style="padding-left:25px;padding-right:25px;"></div>';

	    scope.size = 100;

	    element = $compile(element)(scope);
	    scope.$digest();
	  }));
	
	it('should check validity on init', function() {
        expect(element.div).not.toBeNull();
    });
	
	it("should contain a div tag with proper attribute values", function() {
	    expect(element.attr('style')).toBe('margin-top:0px;');
	    expect(element.attr('class')).toBe('jumbotron-title recall-background ng-scope');
	  });
});	