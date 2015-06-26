// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Controller: BreadCrumbsController', function () {

  // load the controller's module
  beforeEach(module('MedExplorer'));

  var BreadCrumbsController,
    scope;

  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BreadCrumbsController = $controller('BreadCrumbsController', {
      $scope: scope
    });
  }));
  
  it('has a BreadCrumbsController', function() {
		expect(BreadCrumbsController).not.toBeNull();
	});

  it('value should be not null', function () {
    expect(scope.value).not.toBeNull();
    expect(scope.source).not.toBeNull();
    expect(scope.type).not.toBeNull();
    expect(scope.field).not.toBeNull();
    expect(scope.limit).not.toBeNull();
    expect(scope.tabName).not.toBeNull();
  });
  

});