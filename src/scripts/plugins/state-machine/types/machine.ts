import { Dic } from './dic'

export abstract class Machine {
  initial: string
  states: Dic<State>
  state: string
  args: Dic<any>[]
  abstract step(): void
  abstract transition(newState: string, ...enterArgs: Dic<any>[]): void
}

export abstract class State {
  stateMachine: Machine
  abstract enter(...args: Dic<any>[]): void
  abstract execute(...args: Dic<any>[]): void
}
