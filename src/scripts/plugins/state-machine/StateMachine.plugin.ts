export class StateMachinePlugin extends Phaser.Plugins.BasePlugin {
  constructor(PluginManager: Phaser.Plugins.PluginManager) {
    super(PluginManager)
    this.pluginManager.registerGameObject('StateMachine')
  }

  init(data: any) {}

  start() {}

  stop() {}

  destroy() {}
}
