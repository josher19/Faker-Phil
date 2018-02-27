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

rand = (n=1.0) -> Math.floor( Math.random() * n )

class Phil

pick = Phil.pick = (num) ->
   #if typeof num is "number"
   #  return Math.random()*num
   if num.length && !num.charCodeAt
     return num[Math.floor(Math.random()*num.length)] 
   num

Phil.loop = (num, fn) ->
  for i in [0..pick(num)-1]
    fn(i)
  i
  #end
#end

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
          Phil.paragraphs(1)
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

Phil.link_list = (list_items = [3..10], item_length = [1..5]) ->
  build_tag "ul", build_tags("li", (-> "<a href='#'>#{Phil.words(item_length)}</a>"), list_items)

Phil.markup = (pattern="h1 p p h2 p ol h2 p ul") ->
  #html_safe 
  pattern.split(" ").map( (t) -> tag(t) ).join('')

Phil.currency = (num, symbol = "$") ->
      val = ((pick(num) * 100) / 100).toFixed(2)
      #sprintf("$%.2f", val)
      symbol + val

Phil.number = (len) ->
  [1..len].map(-> rand(10)).join('')

Phil.phone = (format = "(###) ###-####") ->
  format.replace(/#/g,  -> rand(9) + 1)

Phil.date = (day_window) ->
  t = Date.now?() or new Date().getTime()
  new Date(if day_window then t - rand(day_window) * 86400000 else rand(t))

Phil.city = -> 
  Faker.Address.city()

Phil.domainName = ->
  Faker.Internet.domainName()

Phil.email = ->
  Faker.Internet.email()

Phil.firstName = ->
  Faker.Name.firstName()

Phil.lastName = ->
  Faker.Name.lastName()

Phil.name = ->
  Faker.Name.name()

Phil.state = ->
  Faker.Address.usState()

Phil.state_abbr = ->
  Faker.random.us_state_abbr()

Phil.body_content = Phil.markup

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

Phil.again = (@lastmod) -> 
    require.cache[require.resolve(@lastmod)]=null; 
    require @lastmod;
