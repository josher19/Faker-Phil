var Phil, count_words, expect, expect_element, find_children, utils, _ref;

Phil = require('../Phil');

_ref = utils = require('./utils'), expect = _ref.expect, find_children = _ref.find_children, expect_element = _ref.expect_element, count_words = _ref.count_words;

describe('#currency', function() {
  return context('default currency', function() {
    var amount, c, _i, _results;
    amount = (function() {
      _results = [];
      for (_i = 10; _i <= 100; _i++){ _results.push(_i); }
      return _results;
    }).apply(this);
    c = Phil.currency(amount);
    it('returns a string with a dollar value', function() {
      return expect(c).toStartWith('$');
    });
    it("returns a dollar value within 10..100", function() {
      return expect(amount).toCover(c.replace(/\$/g, "") - 0);
    });
    it("formats the currency to two decimal places", function() {
      return expect(c).toMatch(/\$\d{2}\.\d{2}/);
    });
    return it("starts with a money symbol", function() {
      var cc, symbol;
      symbol = Phil.pick(["EUR ", "RMB ", "CAN $"]);
      cc = Phil.currency(amount, symbol);
      return expect(cc).toStartWith(symbol);
    });
  });
});
