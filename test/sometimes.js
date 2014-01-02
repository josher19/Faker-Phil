var Phil, expect;

Phil = require('../Phil');

if (typeof expect === "undefined" || expect === null) expect = Phil.expect;

describe('sometimes', function() {
  var values;
  values = [];
  beforeEach(function() {
    return values = [];
  });
  it('does something approx. 1/3 of the time by default', function() {
    var x, _i, _results;
    for (x = 0; x <= 1000; x++) {
      Phil.sometimes(function(i) {
        return values.push(i);
      });
    }
    expect((function() {
      _results = [];
      for (_i = 150; _i <= 450; _i++){ _results.push(_i); }
      return _results;
    }).apply(this)).toCover(values.length);
    return this;
  });
  it('does something approx. 1/10 of the time', function() {
    var x, _i, _results;
    values = [];
    for (x = 0; x <= 1000; x++) {
      Phil.sometimes(10, function(i) {
        return values.push(i);
      });
    }
    expect((function() {
      _results = [];
      for (_i = 0; _i <= 150; _i++){ _results.push(_i); }
      return _results;
    }).apply(this)).toCover(values.length);
    return this;
  });
  return this;
});
