Phil = require '../Phil'
{expect,find_children, expect_element, count_words} = utils = require './utils'

describe '#ol', ->

    context 'default value', ->

      ol = Phil.ol()

      it 'outputs a ol', ->
        expect_element(ol, 'ol')
        undefined
      #end
      it 'contains 3..10 list items', ->
        expect([3..10]).toCover(find_children(ol, 'li').length)
      #end
      it 'each containing 3..15 words', ->
        find_children(ol, 'li').forEach (li) ->
          expect([3..15]).toCover(count_words(li))
        #end
      #end

    #end

    context 'custom values', ->

      li_count = [15..20]
      word_count = [20..22]
      ol = Phil.ol li_count, word_count

      it "contains 15..20 list items", ->
        expect(li_count).toCover(find_children(ol, 'li').length)
      #end
      it "each containing 20..22 words", ->
        find_children(ol, 'li').forEach (li) ->
          expect(word_count).toCover(count_words(li))
        #end
      #end

    #end

  #end