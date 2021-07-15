import { Dic } from './dic'

export abstract class Machine {
  initial: string
  states: Dic<State>
  args: Dic<any>[]
  state: string
  previous_state: string
  abstract step(): void
  abstract transition(newState: string, ...enterArgs: Dic<any>[]): void
  abstract showState(): string
}

export abstract class State {
  stateMachine: Machine
  abstract enter(...args: Dic<any>[]): void
  abstract execute(...args: Dic<any>[]): void
}
