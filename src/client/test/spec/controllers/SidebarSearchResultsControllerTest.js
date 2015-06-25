'use strict';

describe('Controller: SidebarSearchResultsController', function () {

  // load the controller's module
  beforeEach(module('MedExplorer'));

  var SidebarSearchResultsController,
    scope;

  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidebarSearchResultsController = $controller('SidebarSearchResultsController', {
      $scope: scope
    });
  }));
/**
  it('message should read "Hello World!"', function () {
    expect(scope.message).toBe('Hello World!');
  });
  */

});
