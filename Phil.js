var Expect, Faker, Phil, build_tag, build_tags, expect, format_image_argument_output, html_safe, parse_image_arguments, pick, tag,
  __hasProp = Object.prototype.hasOwnProperty;

if (typeof require === "function") {
  Faker = require('Faker');
  require.again = function(lastmod) {
    this.lastmod = lastmod != null ? lastmod : this.lastmod;
    require.cache[require.resolve(this.lastmod)] = null;
    return require(this.lastmod);
  };
}

html_safe = function(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

parse_image_arguments = function(obj) {
  var arg, argu, k, output, v, _i, _len;
  output = {};
  if (obj && typeof obj === "object") {
    for (k in obj) {
      if (!__hasProp.call(obj, k)) continue;
      v = obj[k];
      output[k] = v;
    }
  }
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    argu = arguments[_i];
    arg = argu.toString();
    switch (false) {
      case !arg.match(/^(#[a-f\d]{3,6}(\/(?=#))?){1,2}$/):
        output['color'] = arg;
        break;
      case !arg.match(/^([\d\.]*)x?([\d\.]*?)$/):
        output['size'] = arg;
        break;
      default:
        if (obj !== argu) output['text'] = arg;
    }
  }
  return output;
};

format_image_argument_output = function(args) {
  var k, v;
  if (!args['color']) {
    args['color'] = "" + (args['background'] || '') + (args['foreground'] || '');
  }
  if (args['width'] && args['height']) {
    args['size'] = "" + (Phil.pick(args['width'])) + "x" + (Phil.pick(args['height']));
  }
  for (k in args) {
    v = args[k];
    switch (k) {
      case "color":
        args[k] = v.replace(/\/?#/g, '/');
        break;
      case "text":
        args['text'] = "&text=" + (v.replace(/[^\d\w\!,\.;:-]+/g, '+').replace(/\+?$/g, ''));
    }
  }
  return args;
};

Phil = (function() {

  function Phil() {}

  return Phil;

})();

pick = Phil.pick = function(num) {
  if (num.length && !num.charCodeAt) {
    return num[Math.floor(Math.random() * num.length)];
  }
  return num;
};

/** Private
*/

build_tags = function(name, content, elements) {
  var content_method, times, x;
  if (elements == null) elements = 1;
  content_method = typeof content === "function" ? content : function() {
    return Phil.words(content);
  };
  times = pick(elements);
  return ((function() {
    var _results;
    _results = [];
    for (x = 1; 1 <= times ? x <= times : x >= times; 1 <= times ? x++ : x--) {
      _results.push(build_tag(name, content_method));
    }
    return _results;
  })()).join('');
};

build_tag = function(name, content) {
  return "<" + name + ">" + ((typeof content === "function" ? content() : void 0) || content) + "</" + name + ">";
};

tag = function(name, content, children) {
  switch (name) {
    case "ul":
    case "ol":
      content || (content = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      children || (children = [3, 4, 5, 6, 7, 8, 9, 10]);
      return build_tag(name, build_tags("li", content, children));
    case "blockquote":
      content || (content = [1, 2, 3]);
      return build_tag(name, Phil.paragraphs(content));
    case "p":
      return paragraphs(1);
    default:
      content || (content = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      return build_tags(name, content);
  }
};

Phil.image = function() {
  var opts;
  opts = format_image_argument_output(parse_image_arguments.apply(Phil, arguments));
  return opts['size'] && ("http://placehold.it/" + opts['size'] + (opts['color'] || '') + (opts['text'] || ''));
};

Phil.words = function(num) {
  return html_safe(Faker.Lorem.words(Phil.pick(num)).join(' '));
};

Phil.paragraphs = function(num) {
  var content_method;
  content_method = function() {
    return Faker.Lorem.paragraphs(1);
  };
  return build_tags("p", content_method, pick(num));
};

Phil.blockquote = function(paragraphs) {
  return tag("blockquote", paragraphs);
};

Phil.ul = function(list_items, item_length) {
  return tag("ul", item_length, list_items);
};

Phil.ol = function(list_items, item_length) {
  return tag("ol", item_length, list_items);
};

Phil.sometimes = function(num_or_content, num) {
  var fn, _i, _j, _results, _results2;
  if (num_or_content == null) num_or_content = 3;
  if (num == null) num = 3;
  fn = arguments[arguments.length - 1];
  if (typeof fn === "function") {
    if (typeof num_or_content === "function") num_or_content = 3;
    if (typeof num === "function") num = 3;
    if (num_or_content === Phil.pick((function() {
      _results = [];
      for (var _i = 1; 1 <= num_or_content ? _i <= num_or_content : _i >= num_or_content; 1 <= num_or_content ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this))) {
      return fn(num_or_content, num);
    }
  } else {
    if (num === Phil.pick((function() {
      _results2 = [];
      for (var _j = 1; 1 <= num ? _j <= num : _j >= num; 1 <= num ? _j++ : _j--){ _results2.push(_j); }
      return _results2;
    }).apply(this))) {
      return num_or_content;
    }
  }
};

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = Phil;
}

Phil.again = function(ph) {
  return require.again(ph);
};

if (typeof expect !== "function") {
  expect = function(value) {
    return new Expect(value);
  };
  Expect = function(value) {
    this.value = value;
  };
  Expect.prototype.toEqual = function(that, msg) {
    console.assert(this.value === that, this.value, " !== ", that, msg);
    return this.value === that;
  };
  Expect.prototype.toCover = function(that) {
    var _ref;
    return console.assert(this.value.indexOf(that) > -1, ((_ref = this.value) != null ? _ref.length : void 0) || this.value, "does not cover", that);
  };
  Phil.expect = expect;
}
