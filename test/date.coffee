Phil = require '../Phil'
{expect,Range} = require './utils'

describe '#date', ->

    context 'random date', ->

      now = Date.now?() || new Date().getTime()
      d = Phil.date()

      it 'returns a date', ->
        expect(d).toBeA(Date)
      #end

      it 'returns a date between 1970 and now', ->
        expect(new Range(0,now)).toCover(d.getTime())
      #end
    #end

    context 'custom date window', ->

      now = Date.now?() || new Date().getTime()
      month_ago = now - 30 * 24 * 60 * 60 * 1000
      d = Phil.date 30 

      it 'returns a date in the last 30 days', ->
        expect(new Range(month_ago, now)).toCover(d.getTime())
      #end
    #end

  #end