// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Directive: c3PieChart', function () {

	var c3PieChart, element, scope;
	
	// load the filter's module
	beforeEach(module('MedExplorer'));

	beforeEach(inject(function($rootScope, $compile) {
	    scope = $rootScope.$new();
	    
	    //c3-pie-chart="commonDrugsPieChartData"
	    element =
	        '<div class="col-xs-12" id="chart"></div>';

	    scope.size = 100;

	    element = $compile(element)(scope);
	    scope.$digest();
	  }));
	
	it('should check validity on init', function() {
        expect(element.div).not.toBeNull();
    });
	
	
	it("should contain a div tag with proper attribute values", function() {
	    expect(element.attr('class')).toBe('col-xs-12 ng-scope');
	    expect(element.find('c3-pie-chart')).not.toBeNull();
	    //expect(element.attr('c3-pie-chart')).toBe('commonDrugsPieChartData');
	    expect(element.attr('id')).toBe('chart');
	  });
});
