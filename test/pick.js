var Phil, expect;

Phil = require('../Phil');

expect = require('./utils').expect;

describe('#pick', function() {
  var Subject;
  Subject = function(argument) {
    return Phil.pick(argument);
  };
  context('with a single number', function() {
    var argument, subject;
    argument = 5;
    subject = Subject(argument);
    return it('{ should == 5 }', function() {
      return expect(subject).toEqual(argument);
    });
  });
  context('with a range', function() {
    var argument, subject;
    argument = [3, 4, 5];
    subject = Subject(argument);
    return it('gives one of the arguments back', function() {
      return expect(argument).toCover(subject);
    });
  });
  return context('with an array', function() {
    var argument, subject;
    argument = [2, 5, 7];
    subject = Subject(argument);
    return it('gives one of the arguments back', function() {
      return expect(argument).toCover(subject);
    });
  });
});