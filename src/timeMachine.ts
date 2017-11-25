import { makePair, ref } from './core'
import { fromJS } from 'immutable'

type year = number
interface passager {
  name: string
  state: any
}
interface Changes {
  [property: string]: (state, allStates?) => any
}

class TimeMachine {
  private _passagers = fromJS({})
  private _states = fromJS({})
  private _changes: { [name: string]: Changes } = {}
  private _v(state, name: string) {
    let newState = state
    // should change all passagers
    this._passagers.map((ignore, name) => {
      const changes = this._changes[name]
      for (let path in changes) {
        const realPath = [name].concat(path.split('.'))
        newState = newState.setIn(
          realPath,
          changes[path](newState.getIn(realPath), state)
        )
      }
    })
    return makePair(state.get(name), () => this._v(newState, name))
  }

  public onBoard = (
    name: passager['name'],
    state: passager['state'],
    changes: Changes
  ): TimeMachine => {
    if (!!this._passagers.get(name))
      throw new Error('Passager is already onboard.')
    this._states = this._states.set(name, fromJS(state))
    this._changes[name] = changes
    this._passagers = this._passagers.set(name, this._v(this._states, name))
    return this
  }

  public travel = (num: year) => {
    this._states = this._passagers.map(passager => ref(passager, num + 1))
    return this._states
  }
}

export default TimeMachine
