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
