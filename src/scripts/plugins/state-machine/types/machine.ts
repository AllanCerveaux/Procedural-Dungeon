import { Dic } from '../../../utils/types'

export abstract class Machine {
  initial: string
  states: Dic<State>
  args: Phaser.Scene[]
  abstract step(): void
  abstract transition(newState: string, ...enterArgs: unknown[]): void
}

export abstract class State {
  stateMachine: Machine
  abstract enter(...args: unknown[]): void
  abstract execute(...args: unknown[]): void
}
