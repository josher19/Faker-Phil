var Phil, expect;

Phil = require('../Phil');

expect = require('./utils').expect;

describe('#phone', function() {
  context('default phone format', function() {
    var p;
    p = Phil.phone();
    return it("returns a phone number formatted as (###) ###-####", function() {
      return expect(p).toMatch(/\(\d{3}\) \d{3}-\d{4}/);
    });
  });
  return context('custom phone format', function() {
    var format, p;
    format = '(0##) ########';
    p = Phil.phone(format);
    return it("returns a phone number formatted as `(0##) ########`", function() {
      return expect(p).toMatch(/\(0\d{2}\) \d{8}/);
    });
  });
});

describe('#number', function() {
  var Subject;
  Subject = function(argument) {
    return Phil.number(argument);
  };
  context('3 digit number', function() {
    var argument, subject;
    argument = 3;
    subject = Subject(argument);
    return it('returns a 3 digit number', function() {
      return expect(subject.toString()).toMatch(/^\d{3}$/);
    });
  });
  return context('6 digit number', function() {
    var argument, subject;
    argument = 6;
    subject = Subject(argument);
    return it('returns a 6 digit number', function() {
      return expect(subject.toString()).toMatch(/^\d{6}$/);
    });
  });
});