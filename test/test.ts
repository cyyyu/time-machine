import { expect } from 'chai'
import {
  makePair,
  makeList,
  car,
  cdr,
  map,
  filter,
  ref,
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

  it('ref', () => {
    const l = makeList(1, 2, 3, 4)
    expect(ref(l, 0)).to.equal(1)
    expect(ref(l, 1)).to.equal(2)
    expect(ref(l, 2)).to.equal(3)
    expect(ref(l, 3)).to.equal(4)
  })

  it('map', () => {
    const l = makeList(1, 2, 3, 4)
    const double = item => item * 2
    const doubledL = map(double, l)
    expect(ref(doubledL, 0)).to.equal(2)
    expect(ref(doubledL, 1)).to.equal(4)
    expect(ref(doubledL, 2)).to.equal(6)
    expect(ref(doubledL, 3)).to.equal(8)
    expect(ref(doubledL, 4)).to.equal('')
  })

  it('integers', () => {
    const makeIntegers = (startFrom) =>
      makePair(startFrom, () => makeIntegers(startFrom + 1))
    const integers = makeIntegers(1)
    expect(ref(integers, 0)).to.equal(1)
    expect(ref(integers, 1)).to.equal(2)
    expect(ref(integers, 2)).to.equal(3)
    expect(ref(integers, 3)).to.equal(4)
    expect(ref(integers, 4)).to.equal(5)
  })

  it('filter', () => {
    const l = makeList(1, 2, 3, 4, 5)
    const even = filter(
      item => item % 2 === 0,
      l
    )
    expect(ref(even, 0)).to.equal(2)
    expect(ref(even, 1)).to.equal(4)
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
    expect(ref(primes, 1)).to.equal(3)
    expect(ref(primes, 2)).to.equal(5)
    expect(ref(primes, 3)).to.equal(7)
    expect(ref(primes, 4)).to.equal(11)
    expect(ref(primes, 5)).to.equal(13)
  })

})