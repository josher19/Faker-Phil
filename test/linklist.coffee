Phil = require '../Phil'
{expect,find_children, expect_element, count_words} = utils = require './utils'

describe '#link_list', ->

    context 'default value', ->

      ll = Phil.link_list()

      it 'outputs a ul', ->
        expect_element(ll, 'ul')
      #end
      it 'contains 3..10 list items', ->
        expect([3..10]).toCover(find_children(ll, 'li').length)
      #end
      it 'each containing a link with 1..5 words', ->
        find_children(ll, 'li').forEach (li) ->
          find_children(li, 'a').forEach (a) ->
            expect([1..5]).toCover(count_words(a))
          #end
        #end
      #end

    #end

    context 'custom values', ->

      li_count = [15..20] 
      word_count = [20..22] 
      ll = Phil.link_list li_count, word_count 

      it "contains 15..20 list items", ->
        expect(li_count).toCover(find_children(ll, 'li').length)
      #end
      it "each containing a link with 20..22 words", ->
        find_children(ll, 'li').forEach (li) ->
          find_children(li, 'a').forEach (a) ->
            expect(word_count).toCover(count_words(a))
          #end
        #end
      #end

    #end

#end