export function makePair(car, cdr) {
  return {
    car,
    cdr
  }
}

export function car(pair) {
  if (!pair) throw new Error('bad type')
  return pair.car
}

export function cdr(pair) {
  if (!pair) throw new Error('bad type')
  return pair.cdr()
}

const _emptyPair = () => makePair('', () => '')

export function makeList(...args) {
  const v = args[0]
  return v ?
    makePair(v, () => makeList(...args.slice(1)))
    :
    _emptyPair()
}

export function map(fn, list) {
  const val = car(list)
  return val ?
    makePair(fn(val), () => map(fn, cdr(list)))
    :
    _emptyPair()
}

export function filter(fn, list) {
  const val = car(list)
  return val ?
    fn(val) ?
      val
      :
      filter(fn, cdr(list))
    :
    ''
}