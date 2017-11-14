import { makePair, ref } from './core'
import { fromJS } from 'immutable'

type year = number
interface passager {
  name: string
  state: any
}

class TimeMachine {
  private _passagers = fromJS({})
  private _states = fromJS({})
  private _v(state, fn = (state, allStates) => state) {
    return lastState =>
      makePair(state, () => this._v(fn(state, lastState), fn)(lastState))
  }

  public onBoard = (
    name: passager['name'],
    state: passager['state'],
    fn?: (state, allStates?) => any
  ): TimeMachine => {
    if (this._passagers.get(name))
      throw new Error('Passager is already onboard.')
    this._passagers = this._passagers.set(name, this._v(fromJS(state), fn))
    this._states = this.travel(0)
    return this
  }

  public travel = (num: year, tmp = this._states) => {
    const newState = this._passagers.map(i => ref(i(tmp), num))
    return newState.equals(tmp) ? newState : this.travel(num, newState)
  }
}

export default TimeMachine
