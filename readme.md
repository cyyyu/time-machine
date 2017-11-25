# Time Machine

[![npm version](https://badge.fury.io/js/t-machine.svg)](https://badge.fury.io/js/t-machine)
[![Build Status](https://travis-ci.org/cyyyu/time-machine.svg?branch=master)](https://travis-ci.org/cyyyu/time-machine)

Take trips with magic.

### Usage

```
import TimeMachine from 't-machine'

// Instance your time machine now
const machine = new TimeMachine()

const Tom = {
  age: 24,
  alive: true
}
const Jack = {
  age: 25,
  alive: true,
  feeling: 'happy'
}

// Onboard Friends Tom & Jack
machine
  .onBoard('Tom', Tom, {
    age: age => (age < 80 ? ++age : age),
    alive: (alive, states) => {
      return states.getIn(['Tom', 'age']) < 80
    }
  })
  .onBoard('Jack', Jack, {
    age: age => (age < 90 ? ++age : age),
    alive: (alive, states) => states.getIn(['Jack', 'age']) < 90,
    feeling: (feeling, states) => {
      return states.getIn(['Tom', 'alive']) ? 'happy' : 'sad'
    }
  })

// Let's travel...

// 30 years later...
machine.travel(30).get('Tom').get('age') // 54
machine.travel(30).getIn(['Tom', 'alive']) // true
machine.travel(30).getIn(['Jack', 'age']) // 55
machine.travel(30).getIn(['Jack', 'alive']) // true
machine.travel(30).getIn(['Jack', 'fealing']) // happy

// 60 years later...
machine.travel(60).getIn(['Tom', 'age']) // 80
machine.travel(60).getIn(['Tom', 'alive']) // false
machine.travel(60).getIn(['Jack', 'age']) // 85
machine.travel(60).getIn(['Jack', 'alive']) // true
machine.travel(60).getIn(['Jack', 'feeling']) // sad
```

### Install

With npm

`npm install t-machine`

### Test

`npm test`

### License

MIT
