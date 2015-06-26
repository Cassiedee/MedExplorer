// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Controller: SidebarRecentRecallsController', function () {

  // load the controller's module
  beforeEach(module('MedExplorer'));

  var SidebarRecentRecallsController,
    scope;

  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidebarRecentRecallsController = $controller('SidebarRecentRecallsController', {
      $scope: scope
    });
  }));


  it('has a SidebarRecentRecallsController', function() {
		expect(SidebarRecentRecallsController).not.toBeNull();
	});
  
  it('scope values should be not null', function () {
	    expect(scope.results).not.toBeNull();
	    expect(scope.resultsLength).not.toBeNull();
	  });
});
