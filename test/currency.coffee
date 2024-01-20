Phil = require '../Phil'
{expect, find_children, expect_element, count_words} = utils = require './utils'

describe '#currency', ->

    context 'default currency', ->

      amount = [10..100]
      c = Phil.currency amount

      it 'returns a string with a dollar value', ->
        expect(c).toStartWith('$')
      #end

      it "returns a dollar value within 10..100", ->
        expect(amount).toCover(c.replace(/\$/g, "")-0)
      #end

      it "formats the currency to two decimal places", ->
        expect(c).toMatch(/\$\d{2}\.\d{2}/)
      #end

      it "starts with a money symbol", ->
        symbol = Phil.pick ["EUR ", "RMB ", "CAN $"]
        cc = Phil.currency amount, symbol
        expect(cc).toStartWith symbol
    #end

  #end
