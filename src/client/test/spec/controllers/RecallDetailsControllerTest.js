// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Controller: RecallDetailsController', function () {

  // load the controller's module
  beforeEach(module('MedExplorer'));

  var RecallDetailsController,
    scope;

  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecallDetailsController = $controller('RecallDetailsController', {
      $scope: scope
    });
  }));


  it('has a RecallDetailsController', function() {
		expect(RecallDetailsController).not.toBeNull();
	});
  
  it('scope values should be not null', function () {
	    expect(scope.recallList).not.toBeNull();
	  });

});
