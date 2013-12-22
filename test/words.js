(function() {
  var Phil, expect;

  Phil = require('../Phil');

  if (typeof expect === "undefined" || expect === null) expect = Phil.expect;

  describe('words', function() {
    var Subject;
    Subject = function() {
      return Phil.words.apply(Phil, arguments);
    };
    context('with a single number', function() {
      var argument, subject;
      argument = 5;
      subject = Subject(argument);
      return it('outputs 5 words', function() {
        return expect(subject.split(' ').length).toEqual(argument);
      });
    });
    context('with a range', function() {
      var argument, subject;
      argument = [10, 20];
      subject = Subject(argument);
      return it('outputs 10..20 words', function() {
        return expect(argument).toCover(subject.split(' ').length);
      });
    });
    return this;
  });

}).call(this);
