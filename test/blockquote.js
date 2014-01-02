var Phil, expect, expect_element, find_children, utils;

Phil = require('../Phil');

utils = require('./utils');

if (typeof expect === "undefined" || expect === null) expect = utils.expect;

find_children = utils.find_children, expect_element = utils.expect_element;

describe('#blockquote', function() {
  context('default value', function() {
    var bq;
    bq = Phil.blockquote();
    beforeEach(function() {
      return bq = Phil.blockquote();
    });
    it('outputs a blockquote', function() {
      return expect_element(bq, 'blockquote');
    });
    return it('contains 1..3 paragraphs', function() {
      return expect([1, 2, 3]).toCover(find_children(bq, 'p').length);
    });
  });
  return context('custom value', function() {
    var bq;
    bq = Phil.blockquote([5, 6, 7, 8, 9, 10]);
    return it('contains 5..10 paragraphs', function() {
      return expect([5, 6, 7, 8, 9, 10]).toCover(find_children(bq, 'p').length);
    });
  });
});

/*
describe 'words', ->

    Subject = -> Phil.words(arguments...) 

    context 'with a single number', ->

      #let(:argument) { 5 }
      argument = 5
      subject = Subject argument

      it 'outputs 5 words', ->
        expect(subject.split(' ').length).toEqual(argument)
      #end
    #end

    context 'with a range', ->

      #let(:argument) { (10..20) }
      argument = [10,20]
      subject = Subject argument

      it 'outputs 10..20 words', ->
        expect(argument).toCover(subject.split(' ').length)
      #end

    @
    #end
#end
*/
