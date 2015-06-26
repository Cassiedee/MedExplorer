// # Copyright (c) 2015 Northrop Grumman Systems Corporation. All Rights Reserved.
'use strict';

describe('Service: searchResultsFactory', function () {

	var searchResultsFactory, searchResults;
	
	// load the filter's module
	beforeEach(module('MedExplorer', function($provide) {
		searchResults = {};

	    searchResults.results = jasmine.createSpy();
	    searchResults.executeSearch = jasmine.createSpy();

	    $provide.value('searchResults', searchResults);
	  }));

	  beforeEach(inject(function(_searchResultsFactory_) {
		  searchResultsFactory = _searchResultsFactory_;

	  }));

	  it('return results', function() {
		  //source=drug&type=label&field=openfda.brand_name&value=Tylenol&limit=30
		  searchResultsFactory.executeSearch('drug', 'label', 'openfda.brand_name', 'Tylenol', 30);
	
		  expect(searchResults).not.toBeNull();
		});
});
