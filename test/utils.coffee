Phil = require '../Phil'

if typeof expect != "function" 
   expect = (value) -> new Expect(value)
   Expect = (@value) -> 
   Expect::toEqual = (that, msg) -> console.assert(@value == that, @value, " !== ", that, msg); @value == that
   Expect::toCover = (that) -> console.assert @value.indexOf(that) > -1, (@value?.length or @value), "does not cover", that
   Phil.expect = expect

find_children = find_elements = (content, tag) ->
  content.replace(/\n/g, " ").match(RegExp("<#{tag}>(.+?)</#{tag}>", "gi")) or []

expect_element = (content, tag) ->
  #expect(content).toStartWith "<#{tag}>"
  expect(content.indexOf("<#{tag}>")).toEqual(0, content)
  #expect(content).toEndWith "</#{tag}>"
  expect(content.match(RegExp("<\/#{tag}>$"))?.length).toEqual(1, content)

count_words = (content) ->
    if typeof content is "string"
      content.split(' ').length
    else
      content.nodes[0].split(' ').length
    # end
# end

if module?
  module.exports = {
    find_children:find_children,
    expect_element:expect_element,
    expect:expect,
    count_words
  }