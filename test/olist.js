var Phil, count_words, expect, expect_element, find_children, utils, _ref;

Phil = require('../Phil');

_ref = utils = require('./utils'), expect = _ref.expect, find_children = _ref.find_children, expect_element = _ref.expect_element, count_words = _ref.count_words;

describe('#ol', function() {
  context('default value', function() {
    var ol;
    ol = Phil.ol();
    it('outputs a ol', function() {
      expect_element(ol, 'ol');
      return;
    });
    it('contains 3..10 list items', function() {
      return expect([3, 4, 5, 6, 7, 8, 9, 10]).toCover(find_children(ol, 'li').length);
    });
    return it('each containing 3..15 words', function() {
      return find_children(ol, 'li').forEach(function(li) {
        return expect([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).toCover(count_words(li));
      });
    });
  });
  return context('custom values', function() {
    var li_count, ol, word_count;
    li_count = [15, 16, 17, 18, 19, 20];
    word_count = [20, 21, 22];
    ol = Phil.ol(li_count, word_count);
    it("contains 15..20 list items", function() {
      return expect(li_count).toCover(find_children(ol, 'li').length);
    });
    return it("each containing 20..22 words", function() {
      return find_children(ol, 'li').forEach(function(li) {
        return expect(word_count).toCover(count_words(li));
      });
    });
  });
});
