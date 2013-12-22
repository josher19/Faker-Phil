(function() {
  var Phil, expect;

  Phil = require('../Phil');

  if (typeof expect === "undefined" || expect === null) expect = Phil.expect;

  describe('Phil.image', function() {
    it('should use placeholder images', function() {
      expect(Phil.image(200)).toEqual('http://placehold.it/200');
      expect(Phil.image('200x100')).toEqual('http://placehold.it/200x100');
      expect(Phil.image('200x100', '#ff0000')).toEqual('http://placehold.it/200x100/ff0000');
      expect(Phil.image(200, 'parachute&pants:% are they; the best?')).toEqual('http://placehold.it/200&text=parachute+pants:+are+they;+the+best');
      return expect(Phil.image('#fff', 'no size')).toEqual(void 0);
    });
    it('parameters can be passed by name', function() {
      var args;
      args = {
        width: 200,
        height: 100,
        background: '#000',
        foreground: '#fff',
        text: 'pants'
      };
      return expect(Phil.image(args)).toEqual('http://placehold.it/200x100/000/fff&text=pants');
    });
    it('dims specified in range', function() {
      var range_matches, subject, _i, _j, _k, _l, _results, _results2, _results3, _results4;
      subject = Phil.image({
        width: (function() {
          _results = [];
          for (_i = 100; _i <= 200; _i++){ _results.push(_i); }
          return _results;
        }).apply(this),
        height: (function() {
          _results2 = [];
          for (_j = 300; _j <= 400; _j++){ _results2.push(_j); }
          return _results2;
        }).apply(this)
      });
      range_matches = subject.match(/http:\/\/placehold\.it\/(\d+)x(\d+)/);
      expect((function() {
        _results3 = [];
        for (_k = 100; _k <= 200; _k++){ _results3.push(_k); }
        return _results3;
      }).apply(this)).toCover(+range_matches[1]);
      return expect((function() {
        _results4 = [];
        for (_l = 300; _l <= 400; _l++){ _results4.push(_l); }
        return _results4;
      }).apply(this)).toCover(+range_matches[2]);
    });
    return this;
  });

  describe('image2', function() {
    var Subject;
    Subject = function() {
      return Phil.image.apply(Phil, arguments);
    };
    it('only one dimension specified', function() {
      var subject;
      subject = Subject(200);
      return it('outputs a valid placeholder url', function() {
        return expect(subject).toEqual('http://placehold.it/200');
      });
    });
    return context('strips illegal characters', function() {
      var subject;
      subject = Subject(200, 'parachute&pants:% are they; the best?');
      return it('outputs a valid placeholder url', function() {
        return expect(subject).toEqual('http://placehold.it/200&text=parachute+pants:+are+they;+the+best');
      });
    });
  });

}).call(this);