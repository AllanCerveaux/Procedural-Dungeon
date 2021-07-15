import { State } from '../../../../plugins/state-machine/types'
import { Hero } from '../hero'

export class SupportItem extends State {
  enter(scene: Phaser.Scene, hero: Hero): void {
    console.log('support item')
    this.stateMachine.transition(this.stateMachine.previous_state)
  }

  execute(scene: Phaser.Scene, hero: Hero): void {}
}
