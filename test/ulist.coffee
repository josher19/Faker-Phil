Phil = require '../Phil'
{expect,find_children, expect_element, count_words} = utils = require './utils'

describe '#ul', ->

    context 'default value', ->

      ul = Phil.ul()
      beforeEach -> 
        ul = Phil.ul()

      it 'outputs a ul', ->
        expect_element(ul, 'ul')
      # end
      it 'contains 3..10 list items', ->
        expect([3..10]).toCover(find_children(ul, 'li').length)
      # end
      it 'each containing 3..15 words', ->
        find_children(ul, 'li').forEach (li) -> 
          expect([3..15]).toCover(count_words(li))
        # end
      # end
      @

    #end

    context 'custom values', ->

      li_count =  [15..20]
      word_count = [20..22]
      ul = Phil.ul li_count, word_count

      it "contains 15..20 list items", ->
        expect(li_count).toCover(find_children(ul, 'li').length)
      #end
      it "each containing 20..22 words", ->
        find_children(ul, 'li').forEach (li) -> 
          expect(word_count).toCover(count_words(li))
        #end
      #end
      @

    #end
    @

  #end
