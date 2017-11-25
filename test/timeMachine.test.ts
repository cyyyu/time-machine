import { expect } from 'chai'
import TimeMachine from '../src/timeMachine'
import { fromJS } from 'immutable'

describe('TimeMachine', () => {
  it('add passagers & travel', () => {
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

    expect(machine.travel(30).getIn(['Tom', 'age'])).to.equal(54)
    expect(machine.travel(30).getIn(['Jack', 'age'])).to.equal(55)
    expect(machine.travel(55).getIn(['Tom', 'alive'])).to.equal(true)
    expect(machine.travel(100).getIn(['Tom', 'age'])).to.equal(80) // forever 80
    expect(machine.travel(100).getIn(['Tom', 'alive'])).to.equal(false) // gone
    expect(machine.travel(20).getIn(['Jack', 'feeling'])).to.equal('happy') // Tom is back
  })
})
