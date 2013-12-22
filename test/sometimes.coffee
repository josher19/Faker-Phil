 Phil = require '../Phil'
 expect = Phil.expect unless expect?

 describe 'sometimes', ->

    #let(:values) { [] }
    values = []

    beforeEach -> values = []

    it 'does something approx. 1/3 of the time by default', ->
      for x in [0..1000]
        Phil.sometimes (i) -> values.push(i) 
      # end
      expect([150..450]).toCover(values.length)
      @
    # end

    it 'does something approx. 1/10 of the time', ->
      values = []
      for x in [0..1000]
        Phil.sometimes 10,  (i) -> values.push(i) 
      #end
      expect([0..150]).toCover(values.length)
      @
    #end
    @
  #end