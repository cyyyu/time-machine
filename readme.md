# Time Machine

[![npm version](https://badge.fury.io/js/t-machine.svg)](https://badge.fury.io/js/t-machine)

Take trips with magic.

### Usage

```
import TimeMachine from 't-machine'

// Instance your time machine now
const machine = new TimeMachine()

// Onboard Tom
machine.onBoard(
  'Tom',
  { age: 24 },
  (state) => state.set('age', state.get('age') + 1) // age grows as the year grows...
)

// Let's travel...

// 30 years later...
// Tom is 54 years old...
machine.travel(30).get('Tom').get('age') // 54

// Travel back...
machine.travel(15).get('Tom').get('age') // 29
```

### Install

With npm

`npm install t-machine`

### Test

`npm test`

### License

MIT