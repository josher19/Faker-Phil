// Generated by CoffeeScript 1.12.7
var Phil, Range, expect, ref;

Phil = require('../Phil');

ref = require('./utils'), expect = ref.expect, Range = ref.Range;

describe('#range', function() {
  it('should return a random number within the specified range', function() {
    var result;
    result = Phil.range(0, 10);
    return expect(new Range(0, 10)).toCover(result);
  });
  it('should return a random number between 0 and the specified high value', function() {
    var result;
    result = Phil.range(5);
    return expect(new Range(0, 5)).toCover(result);
  });
  it('should return a random number between 0 and 9 if no arguments are provided', function() {
    var result;
    result = Phil.range();
    return expect(new Range(0, 9)).toCover(result);
  });
  return it('should return a random number between 1 and 6', function() {
    var result;
    result = Phil.range(1, 6);
    return expect(new Range(1, 6)).toCover(result);
  });
});
