import { Dic } from '../../utils/types'
import { Machine, State } from './types'

export class StateMachine implements Machine {
  initial: string
  states: Dic<State>
  args
  state = null

  constructor(initial, states, args = []) {
    for (const state of Object.values(this.states)) {
      state.stateMachine = this
    }
  }

  step() {
    if (this.state === null) {
      this.state = this.initial
      this.states[this.state].enter(...this.args)
    }

    this.states[this.state].execute(...this.args)
  }

  transition(newState, ...enterArgs) {
    this.state = newState
    this.states[this.state].enter(...this.args, ...enterArgs)
  }
}
