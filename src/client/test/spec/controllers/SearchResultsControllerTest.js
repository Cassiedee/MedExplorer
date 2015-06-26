// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
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


  it('has a SearchResultsController', function() {
		expect(SearchResultsController).not.toBeNull();
	});

  it('scope values should be not null', function () {
	    expect(scope.results).not.toBeNull();
	    expect(scope.searchTerm).not.toBeNull();
	    expect(scope.on).not.toBeNull();
	  });
});
