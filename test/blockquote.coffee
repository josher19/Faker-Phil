Phil = require '../Phil'
utils = require './utils'
expect = utils.expect unless expect?
{find_children, expect_element} = utils

describe '#blockquote', ->
  
  context 'default value', ->

    #let(:bq) { Phil.blockquote }
    bq = Phil.blockquote()
    beforeEach -> bq = Phil.blockquote()

    it 'outputs a blockquote', ->
      expect_element(bq, 'blockquote')
    #end
    it 'contains 1..3 paragraphs', ->
      expect([1..3]).toCover(find_children(bq, 'p').length)

  context 'custom value', ->

    #let(:bq) { Phil.blockquote(5..10) }
    bq = Phil.blockquote([5..10])

    it 'contains 5..10 paragraphs', ->
      expect([5..10]).toCover(find_children(bq, 'p').length)