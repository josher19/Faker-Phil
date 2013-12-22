(function() {
  var Phil, expect, find_elements;

  Phil = require('../Phil');

  if (typeof expect === "undefined" || expect === null) expect = Phil.expect;

  find_elements = function(content, tag) {
    return content.match(RegExp("<" + tag + ">", "g")) || {
      length: 0
    };
  };

  describe('#paragraphs', function() {
    var Subject;
    Subject = function() {
      return Phil.paragraphs.apply(Phil, arguments);
    };
    context('with a single number', function() {
      var argument, subject;
      argument = 5;
      subject = Subject(argument);
      return it('outputs 5 paragraphs', function() {
        return expect(find_elements(subject, 'p').length).toEqual(argument);
      });
    });
    return context('with a range', function() {
      var argument, subject;
      argument = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      subject = Subject(argument);
      return it('outputs 10..20 paragraphs', function() {
        return expect(argument).toCover(find_elements(subject, 'p').length);
      });
    });
  });

}).call(this);
