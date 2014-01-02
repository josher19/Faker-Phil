Phil = require '../Phil'
{expect} = require './utils'

describe '#loop', ->

    Subject = (arg) ->
      idx = 0
      Phil.loop arg, (i) -> idx = i + 1 
      idx

    context 'with a single number', ->
      arg = 5
      subject = Subject arg
      it 'loops 5 times', ->
        expect(subject).toEqual(arg)
      #end
    #end

    context 'with a range', ->
      arg = [10..20]
      it 'gives one of the arguments back', ->
        subject = Subject arg
        expect(arg).toCover(subject)
      #end
    #end

#end