import { expect } from 'chai'
import TimeMachine from '../src/timeMachine'
import { fromJS } from 'immutable'

describe('TimeMachine', () => {
  it('add passagers & travel', () => {
    const machine = new TimeMachine()

    const father = {
      age: 34,
      alive: true,
      feeling: 'happy'
    }
    const daughter = {
      age: 7,
      alive: true,
      feeling: 'happy'
    }

    machine
      .onBoard('father', father, state => {
        let newState = state
        if (state.get('age') < 89) {
          newState = state.set('age', state.get('age') + 1) // age grows by years
        }
        if (newState.get('age') > 88) {
          newState = newState.set('alive', false) // dead at 89
        }
        return newState
      })
      .onBoard('daughter', daughter, (state, allStates) => {
        let newState = state
        const fatherAlive = allStates.getIn(['father', 'alive'])
        if (!fatherAlive) {
          newState = state.set('feeling', 'sad')
        }
        newState = newState.set('age', newState.get('age') + 1)
        return newState
      })

    expect(machine.travel(1).getIn(['father', 'age'])).to.equal(35)
    expect(machine.travel(30).getIn(['father', 'age'])).to.equal(64)
    expect(machine.travel(55).getIn(['father', 'alive'])).to.equal(false)
    expect(machine.travel(55).getIn(['daughter', 'feeling'])).to.equal('sad')
    expect(machine.travel(100).getIn(['father', 'age'])).to.equal(89)
    expect(machine.travel(100).getIn(['father', 'age'])).to.equal(89)
  })
})
