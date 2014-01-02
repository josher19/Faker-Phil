Phil = require '../Phil'
{expect} = require './utils'

describe '#phone', ->

    context 'default phone format', ->

      p =  Phil.phone()

      it "returns a phone number formatted as (###) ###-####", ->
        expect(p).toMatch(/\(\d{3}\) \d{3}-\d{4}/)
      #end
    #end

    context 'custom phone format', ->

      format = '(0##) ########' 
      p = Phil.phone(format)

      it "returns a phone number formatted as `(0##) ########`", ->
        expect(p).toMatch(/\(0\d{2}\) \d{8}/)
      #end

    #end
  #end

  describe '#number', ->

    Subject = (argument) -> Phil.number argument 

    context '3 digit number', ->
      argument = 3
      subject = Subject argument
      it 'returns a 3 digit number', ->
        expect(subject.toString()).toMatch(/^\d{3}$/)
      #end
    #end

    context '6 digit number', ->
      #let(:argument) { 6 }
      argument = 6
      subject = Subject argument
      it 'returns a 6 digit number', ->
        expect(subject.toString()).toMatch(/^\d{6}$/)
      #end
    #end
  #end
