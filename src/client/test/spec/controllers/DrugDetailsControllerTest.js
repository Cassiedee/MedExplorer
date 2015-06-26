// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Controller: DrugDetailsController', function () {

  // load the controller's module
  beforeEach(module('MedExplorer'));

  var DrugDetailsController,
    scope;

  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DrugDetailsController = $controller('DrugDetailsController', {
      $scope: scope
    });
  }));


  it('has a DrugDetailsController', function() {
		expect(DrugDetailsController).not.toBeNull();
	});
  
  it('scope values should be not null', function () {
	    expect(scope.tab).not.toBeNull();
	    expect(scope.tab).toBe(1);
	    expect(scope.drugname).not.toBeNull();
	    expect(scope.commonDrugsDuringAdverseEvent).not.toBeNull();
	    expect(scope.commonDrugsPieChartData).not.toBeNull();
	    expect(scope.pieChartDataIsHere).not.toBeNull();
	    expect(scope.result).not.toBeNull();
	  });

});
