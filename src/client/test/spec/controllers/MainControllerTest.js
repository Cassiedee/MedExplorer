// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('MedExplorer'));

  var MainController,
    scope, state;

  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $state) {
    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope,
      state : $state
    });
  }));

  it('has a MainController', function() {
		expect(MainController).not.toBeNull();
	});
  
  it('scope values should be not null', function () {
	    expect(scope.update).not.toBeNull();
	    expect(state).not.toBeNull();
	    
	  });

});
