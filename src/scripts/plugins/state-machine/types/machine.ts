import { Dic } from '../../../utils/types'

export abstract class Machine {
  initial: string
  states: Dic<State>
  args: []
  abstract step(): void
  abstract transition(newState: State, enterArgs): void
}

export abstract class State {
  stateMachine: Machine
  abstract enter(a?: any, b?: any): void
  abstract execute(a?: any): void
}
