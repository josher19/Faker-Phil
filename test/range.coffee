Phil = require '../Phil'
{ expect, Range } = require './utils' 

describe '#range', ->
  it 'should return a random number within the specified range', ->
    result = Phil.range(0, 10)
    expect(new Range(0, 10)).toCover(result)
  #end

  it 'should return a random number between 0 and the specified high value', ->
    result = Phil.range(5)
    expect(new Range(0, 5)).toCover(result)
  #end

  it 'should return a random number between 0 and 9 if no arguments are provided', ->
    result = Phil.range()
    expect(new Range(0, 9)).toCover(result)
  #end

  it 'should return a random number between 1 and 6', ->
    result = Phil.range(1, 6)
    expect(new Range(1, 6)).toCover(result)
  #end
