import { State } from '../../../../plugins/state-machine/types'
import { Hero } from '../hero'

export class ActiveItem extends State {
  enter(scene: Phaser.Scene, hero: Hero): void {
    ;(hero.body as Phaser.Physics.Arcade.Body).moves = false
    scene.time.delayedCall(1000, () => this.stateMachine.transition(this.stateMachine.previous_state))
  }

  execute(scene: Phaser.Scene, hero: Hero): void {}
}
