Phil = require '../Phil'
{expect} = require './utils'

describe '#pick', ->

    Subject = (argument) -> Phil.pick(argument) 

    context 'with a single number', ->
      argument = 5
      subject = Subject argument
      it '{ should == 5 }', ->
        expect(subject).toEqual(argument)
    #end

    context 'with a range', ->
      argument = [3..5]
      subject = Subject argument
      it 'gives one of the arguments back', ->
        expect(argument).toCover(subject)
      #end
    #end

    context 'with an array', ->
      argument = [2, 5, 7]
      subject = Subject argument
      it 'gives one of the arguments back', ->
        expect(argument).toCover(subject)
      #end
    #end

  #end