// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
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
/**
  it('message should read "Hello World!"', function () {
    expect(scope.message).toBe('Hello World!');
  });
  */

});
