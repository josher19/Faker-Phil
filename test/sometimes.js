var Phil, expect;

Phil = require('../Phil');

expect = require('./utils').expect;

describe('sometimes', function() {
  var values;
  values = [];
  beforeEach(function() {
    values = [];
    return;
  });
  it('does something approx. 1/3 of the time by default', function() {
    var pusher, x, _i, _results;
    pusher = function(i) {
      return values.push(i);
    };
    for (x = 0; x <= 1000; x++) {
      Phil.sometimes(pusher);
    }
    expect((function() {
      _results = [];
      for (_i = 150; _i <= 450; _i++){ _results.push(_i); }
      return _results;
    }).apply(this)).toCover(values.length);
    return this;
  });
  it('does something approx. 1/10 of the time', function() {
    var pusher, x, _i, _results;
    pusher = function(i) {
      return values.push(i);
    };
    values = [];
    for (x = 0; x <= 1000; x++) {
      Phil.sometimes(10, pusher);
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
