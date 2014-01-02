var Phil, expect, expect_element, find_children, _ref;

Phil = require('../Phil');

_ref = require('./utils'), find_children = _ref.find_children, expect_element = _ref.expect_element, expect = _ref.expect;

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
