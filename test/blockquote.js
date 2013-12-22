(function() {
  var Phil, expect, expect_element, find_children, find_elements;

  Phil = require('../Phil');

  if (typeof expect === "undefined" || expect === null) expect = Phil.expect;

  find_children = find_elements = function(content, tag) {
    return content.match(RegExp("<" + tag + ">", "g")) || {
      length: 0
    };
  };

  expect_element = function(content, tag) {
    var _ref;
    expect(content.indexOf("<" + tag + ">")).toEqual(0, content);
    return expect((_ref = content.match(RegExp("<\/" + tag + ">$"))) != null ? _ref.length : void 0).toEqual(1, content);
  };

  describe('#blockquote', function() {
    context('default value', function() {
      var bq;
      bq = Phil.blockquote();
      beforeEach(function() {
        return bq = Phil.blockquote();
      });
      it('outputs a blockquote', function() {
        return expect_element(bq, 'blockquote');
      });
      return it('contains 1..3 paragraphs', function() {
        return expect([1, 2, 3]).toCover(find_children(bq, 'p').length);
      });
    });
    return context('custom value', function() {
      var bq;
      bq = Phil.blockquote([5, 6, 7, 8, 9, 10]);
      return it('contains 5..10 paragraphs', function() {
        return expect([5, 6, 7, 8, 9, 10]).toCover(find_children(bq, 'p').length);
      });
    });
  });

  /*
  describe 'words', ->
  
      Subject = -> Phil.words(arguments...) 
  
      context 'with a single number', ->
  
        #let(:argument) { 5 }
        argument = 5
        subject = Subject argument
  
        it 'outputs 5 words', ->
          expect(subject.split(' ').length).toEqual(argument)
        #end
      #end
  
      context 'with a range', ->
  
        #let(:argument) { (10..20) }
        argument = [10,20]
        subject = Subject argument
  
        it 'outputs 10..20 words', ->
          expect(argument).toCover(subject.split(' ').length)
        #end
  
      @
      #end
  #end
  */

}).call(this);
