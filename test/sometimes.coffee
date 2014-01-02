 Phil = require '../Phil'
 expect = Phil.expect unless expect?

 describe 'sometimes', ->

    #let(:values) { [] }
    values = []

    beforeEach -> 
      values = []
      undefined

    it 'does something approx. 1/3 of the time by default', ->
      pusher = (i) -> values.push(i) 
      for x in [0..1000]
        Phil.sometimes pusher
      # end
      expect([150..450]).toCover(values.length)
      @
    # end

    it 'does something approx. 1/10 of the time', ->
      pusher = (i) -> values.push(i) 
      values = []
      for x in [0..1000]
        Phil.sometimes 10, pusher 
      #end
      expect([0..150]).toCover(values.length)
      @
    #end
    @
  #end
