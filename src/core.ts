interface Pair {
  car: any
  cdr: () => any | Pair
}

export function makePair(car: any, cdr: () => any): Pair {
  return {
    car,
    cdr
  }
}

export function car(pair: Pair): any {
  if (!pair) throw new Error('bad type')
  return pair.car
}

export function cdr(pair: Pair): any | Pair {
  if (!pair) throw new Error('bad type')
  return pair.cdr()
}

const _emptyPair = () => makePair('', () => '')

export function makeList(...args: any[]): Pair {
  const v = args[0]
  return v ?
    makePair(v, () => makeList(...args.slice(1)))
    :
    _emptyPair()
}

export function map(fn: (item: any) => any, list: Pair): Pair {
  const val = car(list)
  return val ?
    makePair(fn(val), () => map(fn, cdr(list)))
    :
    _emptyPair()
}

export function filter(fn: (item) => boolean, list: Pair): Pair {
  const val = car(list)
  return val ?
    fn(val) ?
      makePair(val, () => filter(fn, cdr(list)))
      :
      filter(fn, cdr(list))
    :
    _emptyPair()
}

export function ref(list: Pair, n: number) {
  return n ?
    ref(cdr(list), --n)
    :
    car(list)
}