// # Copyright (c) 2015 Norhtrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Controller: SearchResultsController', function () {

  // load the controller's module
  beforeEach(module('MedExplorer'));

  var SearchResultsController,
    scope;

  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchResultsController = $controller('SearchResultsController', {
      $scope: scope
    });
  }));
/**
  it('message should read "Hello World!"', function () {
    expect(scope.message).toBe('Hello World!');
  });
  */

});
