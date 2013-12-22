Phil = require '../Phil'
expect = Phil.expect unless expect?

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