var Phil, expect;

Phil = require('../Phil');

expect = require('./utils').expect;

describe('#loop', function() {
  var Subject;
  Subject = function(arg) {
    var idx;
    idx = 0;
    Phil.loop(arg, function(i) {
      return idx = i + 1;
    });
    return idx;
  };
  context('with a single number', function() {
    var arg, subject;
    arg = 5;
    subject = Subject(arg);
    return it('loops 5 times', function() {
      return expect(subject).toEqual(arg);
    });
  });
  return context('with a range', function() {
    var arg;
    arg = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    return it('gives one of the arguments back', function() {
      var subject;
      subject = Subject(arg);
      return expect(arg).toCover(subject);
    });
  });
});
