Phil = require '../Phil'
expect = Phil.expect unless expect?

find_elements = (content, tag) ->
  content.match(RegExp("<#{tag}>", "g")) or {length:0}

describe '#paragraphs', ->

    #subject { Phil.paragraphs(argument) }
    Subject = -> Phil.paragraphs(arguments...)

    context 'with a single number', ->

      #let(:argument) { 5 }
      argument = 5
      subject = Subject argument

      it 'outputs 5 paragraphs', ->
        expect(find_elements(subject, 'p').length).toEqual(argument)
      #end
    #end

    context 'with a range', ->

      #let(:argument) { (10..20) }
      argument = [10..20]
      subject = Subject argument

      it 'outputs 10..20 paragraphs', ->
        expect(argument).toCover(find_elements(subject, 'p').length)
      #end
    #end

  #end