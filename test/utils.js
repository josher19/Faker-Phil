var Expect, Phil, count_words, expect, expect_element, find_children, find_elements;

Phil = require('../Phil');

if (typeof expect !== "function") {
  expect = function(value) {
    return new Expect(value);
  };
  Expect = function(value) {
    this.value = value;
  };
  Expect.prototype.toEqual = function(that, msg) {
    console.assert(this.value === that, this.value, " !== ", that, msg);
    return this.value === that;
  };
  Expect.prototype.toCover = function(that) {
    var _ref;
    return console.assert(this.value.indexOf(that) > -1, ((_ref = this.value) != null ? _ref.length : void 0) || this.value, "does not cover", that);
  };
  Expect.prototype.toMatch = function(pat) {
    return console.assert(this.value.match(pat) !== null, this.value, "does not match", pat);
  };
  Expect.prototype.toStartWith = function(pat) {
    return console.assert(this.value.indexOf(pat) === 0, this.value, "does not start with", pat);
  };
  Phil.expect = expect;
}

find_children = find_elements = function(content, tag) {
  return content.replace(/\n/g, " ").match(RegExp("<" + tag + ">(.+?)</" + tag + ">", "gi")) || [];
};

expect_element = function(content, tag) {
  var _ref;
  expect(content.indexOf("<" + tag + ">")).toEqual(0, content);
  return expect((_ref = content.match(RegExp("<\/" + tag + ">$"))) != null ? _ref.length : void 0).toEqual(1, content);
};

count_words = function(content) {
  if (typeof content === "string") {
    return content.split(' ').length;
  } else {
    return content.nodes[0].split(' ').length;
  }
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = {
    find_children: find_children,
    expect_element: expect_element,
    expect: expect,
    count_words: count_words
  };
}
