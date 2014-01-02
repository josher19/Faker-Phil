var Phil, Range, expect, _ref;

Phil = require('../Phil');

_ref = require('./utils'), expect = _ref.expect, Range = _ref.Range;

describe('#date', function() {
  context('random date', function() {
    var d, now;
    now = (typeof Date.now === "function" ? Date.now() : void 0) || new Date().getTime();
    d = Phil.date();
    it('returns a date', function() {
      return expect(d).toBeA(Date);
    });
    return it('returns a date between 1970 and now', function() {
      return expect(new Range(0, now)).toCover(d.getTime());
    });
  });
  return context('custom date window', function() {
    var d, month_ago, now;
    now = (typeof Date.now === "function" ? Date.now() : void 0) || new Date().getTime();
    month_ago = now - 8640000 * 30;
    d = Phil.date(30);
    return it('returns a date in the last 30 days', function() {
      return expect(new Range(month_ago, now)).toCover(d.getTime());
    });
  });
});