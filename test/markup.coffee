Phil = require '../Phil'
{expect,find_children, expect_element, count_words} = utils = require './utils'

find_elements = (content, tag) ->
    find_children("<div>#{content}</div>", tag)

expect_elements = (content, tags) ->
    t = tags.split(' ')
    find_elements(content).forEach (n, i) ->
      expect(n.value).toEqual(t[i])

describe '#markup', ->

    context 'default value', ->

      m = Phil.markup()

      it 'outputs h1 p p h2 p ol h2 p ul', ->
        expect_elements(m, 'h1 p p h2 p ol h2 p ul')
      #end

    #end

    context 'custom values', ->

      custom_values = 'blockquote p span b ol'
      m = Phil.markup(custom_values)

      it 'outputs `blockquote p span b ol`', ->
        expect_elements(m, custom_values)
      #end
    #end

  #end

  describe '#link_list', ->

    context 'default value', ->

      ll = Phil.link_list()

      it 'outputs a ul', ->
        expect_element(ll, 'ul')
      ##end
      it 'contains 3..10 list items', ->
        expect([3..10]).toCover(find_children(ll, 'li').length)
      ##end
      it 'each containing a link with 1..5 words', ->
        find_children(ll, 'li').forEach (li) ->
          find_children(li, 'a').forEach (a) ->
            expect([1..5]).toCover(count_words(a))
          ##end
        ##end
      ##end

    ##end

    context 'custom values', ->

      li_count = [15..20] 
      word_count = [20..22] 
      ll = Phil.link_list li_count, word_count 

      it "contains 15..20 list items", ->
        expect(li_count).toCover(find_children(ll, 'li').length)
      ##end
      it "each containing a link with 20..22 words", ->
        find_children(ll, 'li').forEach (li) ->
          find_children(li, 'a').forEach (a) ->
            expect(word_count).toCover(count_words(a))
          ##end
        ##end
      ##end

    ##end

##end