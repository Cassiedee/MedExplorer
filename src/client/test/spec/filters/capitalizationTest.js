'use strict';

describe('Filter: capitalization', function () {

  // load the filter's module
  beforeEach(module('MedExplorer'));
  
  var sentence, uppercase, lowercase, title, titlePreserveUpper;

  // Initialize the filter and a mock scope
  beforeEach(inject(function($injector){
      sentence = $injector.get('$filter')('sentence');
      uppercase = $injector.get('$filter')('uppercase');
      lowercase = $injector.get('$filter')('lowercase');
      title = $injector.get('$filter')('title');
      titlePreserveUpper = $injector.get('$filter')('titlePreserveUpper');
    }));


  it('filters not null', inject(function($filter) {
      expect(sentence).not.toBeNull();
      expect(uppercase).not.toBeNull();
      expect(lowercase).not.toBeNull();
      expect(title).not.toBeNull();
      expect(titlePreserveUpper).not.toBeNull();
  }));
  
  it('sentence_test', function () {
	  expect(sentence('this is a sentence')).toBe('This is a sentence');
  });
  
  it('uppercase', function () {
	  expect(uppercase('this is a sentence')).toBe('THIS IS A SENTENCE');
  });
  
  it('lowercase_test', function () {
	  expect(lowercase('THIS IS A SENTENCE')).toBe('this is a sentence');
  });
  
  it('title_test', function () {
	  expect(title('this is a title')).toBe('This Is A Title');
  });
  
  it('titlePreserveUpper_test', function () {
	  expect(titlePreserveUpper('this is a testTitle')).toBe('This Is A TestTitle');
  });


});
