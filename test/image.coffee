Phil = require '../Phil'
expect = Phil.expect unless expect?

describe 'Phil.image', ->

    it 'should use placeholder images', ->

      expect( Phil.image(200) ).toEqual 'http://placehold.it/200'  
      expect( Phil.image('200x100') ).toEqual 'http://placehold.it/200x100'
      expect( Phil.image('200x100', '#ff0000') ).toEqual 'http://placehold.it/200x100/ff0000'
      expect( Phil.image(200, 'parachute&pants:% are they; the best?') ).toEqual 'http://placehold.it/200&text=parachute+pants:+are+they;+the+best'
      expect( Phil.image('#fff', 'no size') ).toEqual undefined

    it 'parameters can be passed by name', ->
      # context 'parameters can be passed by name'
      args = {
                width: 200,
                height: 100,
                background: '#000',
                foreground: '#fff',
                text: 'pants'
              }
      # alert JSON.stringify format_image_argument_output(parse_image_arguments(args)).size

      expect(Phil.image(args)).toEqual 'http://placehold.it/200x100/000/fff&text=pants'
      # alert JSON.stringify args.size

    it 'dims specified in range', ->
      # context 'dims specified in range'
      subject = Phil.image(width: [100..200], height: [300..400])
      range_matches = subject.match(/http:\/\/placehold\.it\/(\d+)x(\d+)/)
      expect([100..200]).toCover(+range_matches[1])
      expect([300..400]).toCover(+range_matches[2])

    @


describe 'image2', ->
    Subject = -> Phil.image(arguments...)
    it 'only one dimension specified', ->
      # slet arguments, -> 200 
      subject = Subject 200
      it 'outputs a valid placeholder url', ->
        expect(subject).toEqual('http://placehold.it/200')
      #end
    #end

    context 'strips illegal characters', ->
      #let(:arguments) { [200, 'parachute&pants:% are they; the best?'] }
      subject = Subject 200, 'parachute&pants:% are they; the best?'
      it 'outputs a valid placeholder url', ->
        expect(subject).toEqual('http://placehold.it/200&text=parachute+pants:+are+they;+the+best')
      #end
    #end