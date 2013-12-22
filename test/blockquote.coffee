Phil = require '../Phil'
expect = Phil.expect unless expect?

find_children = find_elements = (content, tag) ->
  content.match(RegExp("<#{tag}>", "g")) or {length:0}

expect_element = (content, tag) ->
  #expect(content).toStartWith "<#{tag}>"
  expect(content.indexOf("<#{tag}>")).toEqual(0, content)
  #expect(content).toEndWith "</#{tag}>"
  expect(content.match(RegExp("<\/#{tag}>$"))?.length).toEqual(1, content)

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

###
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
###