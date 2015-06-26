// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
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

});
