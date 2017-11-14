import { expect } from 'chai'
import { makePair, makeList, car, cdr, ref } from '../src/core'

describe('Core', () => {
  it('pair', () => {
    const p = makePair(1, () => 2)
    expect(car(p)).to.equal(1)
    expect(cdr(p)).to.equal(2)
  })

  it('ref', () => {
    const l = makeList(1, 2, 3, 4)
    expect(ref(l, 0)).to.equal(1)
    expect(ref(l, 1)).to.equal(2)
    expect(ref(l, 2)).to.equal(3)
    expect(ref(l, 3)).to.equal(4)
  })
})
