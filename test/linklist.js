var Phil, count_words, expect, expect_element, find_children, utils, _ref;

Phil = require('../Phil');

_ref = utils = require('./utils'), expect = _ref.expect, find_children = _ref.find_children, expect_element = _ref.expect_element, count_words = _ref.count_words;

describe('#link_list', function() {
  context('default value', function() {
    var ll;
    ll = Phil.link_list();
    it('outputs a ul', function() {
      return expect_element(ll, 'ul');
    });
    it('contains 3..10 list items', function() {
      return expect([3, 4, 5, 6, 7, 8, 9, 10]).toCover(find_children(ll, 'li').length);
    });
    return it('each containing a link with 1..5 words', function() {
      return find_children(ll, 'li').forEach(function(li) {
        return find_children(li, 'a').forEach(function(a) {
          return expect([1, 2, 3, 4, 5]).toCover(count_words(a));
        });
      });
    });
  });
  return context('custom values', function() {
    var li_count, ll, word_count;
    li_count = [15, 16, 17, 18, 19, 20];
    word_count = [20, 21, 22];
    ll = Phil.link_list(li_count, word_count);
    it("contains 15..20 list items", function() {
      return expect(li_count).toCover(find_children(ll, 'li').length);
    });
    return it("each containing a link with 20..22 words", function() {
      return find_children(ll, 'li').forEach(function(li) {
        return find_children(li, 'a').forEach(function(a) {
          return expect(word_count).toCover(count_words(a));
        });
      });
    });
  });
});