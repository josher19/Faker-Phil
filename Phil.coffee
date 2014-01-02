if typeof require == "function"
  Faker = require 'Faker' 
  require.again = (@lastmod=@lastmod) -> 
    require.cache[require.resolve(@lastmod)]=null; 
    require @lastmod;

html_safe = (s) ->
   String(s).replace(/&/g, "&amp;").replace(/</g, '&lt;').replace(/>/g, '&gt;')

parse_image_arguments = (obj) ->
  output = {}
  output[k] = v for own k, v of obj if obj && typeof obj == "object" 
  for argu in arguments
    arg = argu.toString()
    switch 
      when arg.match /^(#[a-f\d]{3,6}(\/(?=#))?){1,2}$/ then output['color'] = arg
      when arg.match /^([\d\.]*)x?([\d\.]*?)$/ then output['size'] = arg 
      else output['text'] = arg if obj != argu
  output


format_image_argument_output = (args) ->
     
      if !args['color']
        args['color'] = "#{args['background']||''}#{args['foreground']||''}"
      
      if args['width'] && args['height']
        args['size'] = "#{Phil.pick(args['width'])}x#{Phil.pick(args['height'])}"
      
      for k,v of args
        switch k
          when "color"
            args[k] = v.replace(/\/?#/g, '/')
          when "text"
            args['text'] = "&text=#{v.replace(/[^\d\w\!,\.;:-]+/g, '+').replace(/\+?$/g, '')}"

      args

class Phil

pick = Phil.pick = (num) ->
   if num.length && !num.charCodeAt
     return num[Math.floor(Math.random()*num.length)] 
   num

## def build_tags(name, content, elements = 1)
##      content_method = if content.is_a? Proc then content else -> { words(content) } end
##      pick(elements).times.map { build_tag(name, content_method.call) }.join.html_safe
## end

###* Private ###

build_tags =  (name, content, elements = 1) ->
  content_method = if typeof content is "function" then content else -> Phil.words(content) 
  times = pick(elements)
  (build_tag(name, content_method) for x in [1..times]).join('')
#end

build_tag = (name, content) ->
  # html_safe 
  "<#{name}>#{content?() || content}</#{name}>"
#end

tag = (name, content, children) ->
      switch name
        when "ul", "ol" 
          content ||= [3..15]
          children ||= [3..10]
          build_tag name, build_tags("li", content, children)
        when "blockquote"
          content ||= [1..3]
          build_tag name, Phil.paragraphs(content)
        when "p"
          paragraphs(1)
        else
          content ||= [3..15]
          build_tags name, content
      #end
#end

# Public

Phil.image = () ->
   opts = format_image_argument_output(parse_image_arguments.apply(Phil,arguments))
   opts['size'] && "http://placehold.it/#{opts['size']}#{opts['color']||''}#{opts['text']||''}"

# 200.toString().match(/^([\d\.]*)x?([\d\.]*?)$/).length
# opts = format_image_argument_output(parse_image_arguments(200))
# alert ("http://placehold.it/" + opts['size'] + (opts['color'] || '') + (opts['text'] || ''))

Phil.words = (num) ->
  html_safe Faker.Lorem.words(Phil.pick(num)).join(' ')

Phil.paragraphs = (num) ->
  content_method = -> Faker.Lorem.paragraphs(1)
  build_tags "p", content_method, pick(num)
#end

Phil.blockquote = (paragraphs) ->
  tag "blockquote", paragraphs

Phil.ul = (list_items, item_length) ->
  tag "ul", item_length, list_items

Phil.ol = (list_items, item_length) ->
  tag "ol", item_length, list_items

Phil.sometimes = (num_or_content = 3, num = 3) ->
  fn = arguments[arguments.length-1]

  if typeof fn is "function"
      if typeof num_or_content is "function" then num_or_content = 3
      if typeof num is "function" then num = 3
      if num_or_content == Phil.pick([1..num_or_content]) 
        return fn(num_or_content, num)
  else
      if num == Phil.pick([1..num])
        return num_or_content

module.exports = Phil if module?.exports

# phil = Phil;

Phil.again = (ph) -> require.again(ph)

if typeof expect != "function" 
   expect = (value) -> new Expect(value)
   Expect = (@value) -> 
   Expect::toEqual = (that, msg) -> console.assert(@value == that, @value, " !== ", that, msg); @value == that
   Expect::toCover = (that) -> console.assert @value.indexOf(that) > -1, (@value?.length or @value), "does not cover", that
   Phil.expect = expect

