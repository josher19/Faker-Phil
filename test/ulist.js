// Generated by CoffeeScript 1.3.3
var Phil, count_words, expect, expect_element, find_children, utils, _ref;

Phil = require('../Phil');

_ref = utils = require('./utils'), expect = _ref.expect, find_children = _ref.find_children, expect_element = _ref.expect_element, count_words = _ref.count_words;

describe('#ul', function() {
  context('default value', function() {
    var ul;
    ul = Phil.ul();
    beforeEach(function() {
      return ul = Phil.ul();
    });
    it('outputs a ul', function() {
      return expect_element(ul, 'ul');
    });
    it('contains 3..10 list items', function() {
      return expect([3, 4, 5, 6, 7, 8, 9, 10]).toCover(find_children(ul, 'li').length);
    });
    it('each containing 3..15 words', function() {
      return find_children(ul, 'li').forEach(function(li) {
        return expect([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).toCover(count_words(li));
      });
    });
    return this;
  });
  context('custom values', function() {
    var li_count, ul, word_count;
    li_count = [15, 16, 17, 18, 19, 20];
    word_count = [20, 21, 22];
    ul = Phil.ul(li_count, word_count);
    it("contains 15..20 list items", function() {
      return expect(li_count).toCover(find_children(ul, 'li').length);
    });
    it("each containing 20..22 words", function() {
      return find_children(ul, 'li').forEach(function(li) {
        return expect(word_count).toCover(count_words(li));
      });
    });
    return this;
  });
  return this;
});
