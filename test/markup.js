var Phil, count_words, expect, expect_element, expect_elements, find_children, find_elements, utils, _ref;

Phil = require('../Phil');

_ref = utils = require('./utils'), expect = _ref.expect, find_children = _ref.find_children, expect_element = _ref.expect_element, count_words = _ref.count_words;

find_elements = function(content, tag) {
  return find_children("<div>" + content + "</div>", tag);
};

expect_elements = function(content, tags) {
  var t;
  t = tags.split(' ');
  return find_elements(content).forEach(function(n, i) {
    return expect(n.value).toEqual(t[i]);
  });
};

describe('#markup', function() {
  context('default value', function() {
    var m;
    m = Phil.markup();
    return it('outputs h1 p p h2 p ol h2 p ul', function() {
      return expect_elements(m, 'h1 p p h2 p ol h2 p ul');
    });
  });
  return context('custom values', function() {
    var custom_values, m;
    custom_values = 'blockquote p span b ol';
    m = Phil.markup(custom_values);
    return it('outputs `blockquote p span b ol`', function() {
      return expect_elements(m, custom_values);
    });
  });
});
