import { expect } from 'chai'
import {
  makePair,
  makeList,
  car,
  cdr,
  map,
  filter,
} from '../src/core'

describe('Core', () => {

  it('pair', () => {
    const p = makePair(1, () => 2)
    expect(car(p)).to.equal(1)
    expect(cdr(p)).to.equal(2)
  })

  it('list', () => {
    const l = makeList(1, 2, 3, 4)
    expect(car(l)).to.equal(1)
    expect(car(cdr(l))).to.equal(2)
    expect(car(cdr(cdr(l)))).to.equal(3)
    expect(car(cdr(cdr(cdr(l))))).to.equal(4)
    expect(car(cdr(cdr(cdr(cdr(l)))))).to.equal('')
  })

  it('map', () => {
    const l = makeList(1, 2, 3, 4)
    const double = item => item * 2
    const doubledL = map(double, l)
    expect(car(doubledL)).to.equal(2)
    expect(car(cdr(doubledL))).to.equal(4)
    expect(car(cdr(cdr(doubledL)))).to.equal(6)
    expect(car(cdr(cdr(cdr(doubledL))))).to.equal(8)
    expect(car(cdr(cdr(cdr(cdr(doubledL)))))).to.equal('')
  })

  it('integers', () => {
    const makeIntegers = (startFrom) =>
      makePair(startFrom, () => makeIntegers(startFrom + 1))
    const integers = makeIntegers(1)
    expect(car(integers)).to.equal(1)
    expect(car(cdr(integers))).to.equal(2)
    expect(car(cdr(cdr(integers)))).to.equal(3)
    expect(car(cdr(cdr(cdr(integers))))).to.equal(4)
    expect(car(cdr(cdr(cdr(cdr(integers)))))).to.equal(5)
  })

  it('filter', () => {
    const l = makeList(1, 2, 3, 4, 5)
    const even = filter(
      item => item % 2 === 0,
      l
    )
    expect(car(even)).to.equal(2)
    expect(car(cdr(even))).to.equal(4)
  })

  it('infinite primes', () => {
    const makeIntegers = (startFrom) =>
      makePair(startFrom, () => makeIntegers(startFrom + 1))
    const sieve = (num) =>
      makePair(car(num), () =>
        sieve(
          filter(
            item => !(item % car(num) === 0),
            cdr(num)
          )
        ))
    const primes = sieve(makeIntegers(2))
    expect(car(cdr(primes))).to.equal(3)
    expect(car(cdr(cdr(primes)))).to.equal(5)
    expect(car(cdr(cdr(cdr(primes))))).to.equal(7)
    expect(car(cdr(cdr(cdr(cdr(primes)))))).to.equal(11)
    expect(car(cdr(cdr(cdr(cdr(cdr(primes))))))).to.equal(13)
  })
  
})