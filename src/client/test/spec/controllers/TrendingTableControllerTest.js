// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Controller: TrendingTableController', function () {

  // load the controller's module
  beforeEach(module('MedExplorer'));

  var TrendingTableController,
    scope;

  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrendingTableController = $controller('TrendingTableController', {
      $scope: scope
    });
  }));


  it('has a TrendingTableController', function() {
		expect(TrendingTableController).not.toBeNull();
	});
  
  it('results should be not null', function () {
	    expect(scope.results).not.toBeNull();
	});

});
