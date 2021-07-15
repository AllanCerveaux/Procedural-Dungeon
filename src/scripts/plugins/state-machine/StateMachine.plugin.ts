import { StateMachine } from './StateMachine'
import { Machine } from './types'

export class StateMachinePlugin extends Phaser.Plugins.BasePlugin {
  stateMachine: Machine
  constructor(PluginManager: Phaser.Plugins.PluginManager) {
    super(PluginManager)
    this.pluginManager.registerGameObject('StateMachine')
  }

  init(data?: any) {
    if (data) {
      const { initial, states, args } = data
      this.stateMachine = new StateMachine(initial, states, args)
    }
  }

  step() {
    this.stateMachine.step()
  }
}
