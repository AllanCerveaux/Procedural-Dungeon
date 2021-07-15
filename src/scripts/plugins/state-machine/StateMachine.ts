import { Dic } from '../../utils/types'
import { Machine, State } from './types'

export class StateMachine implements Machine {
  initial: string
  states: Dic<State>
  args: Dic<any>[]
  state: string = null
  previous_state: string = null
  constructor(initial, states, args = []) {
    this.initial = initial
    this.states = states
    this.args = args
    for (const state of Object.values(this.states)) {
      state.stateMachine = this
    }
  }

  step(): void {
    if (this.state === null) {
      this.state = this.initial
      this.states[this.state].enter(...this.args)
    }
    this.states[this.state].execute(...this.args)
  }

  transition(newState, ...enterArgs): void {
    this.previous_state = this.state
    this.state = newState
    this.states[this.state].enter(...this.args, ...enterArgs)
  }
}
