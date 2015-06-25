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
/**
  it('message should read "Hello World!"', function () {
    expect(scope.message).toBe('Hello World!');
  });
  */

});
