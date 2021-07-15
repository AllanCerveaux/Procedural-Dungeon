import { State } from '../../../../plugins/state-machine/types'
import { Hero } from '../hero'

export class AttackState extends State {
  enter(scene: Phaser.Scene, hero: Hero): void {
    console.log('previous', this.stateMachine.previous_state)
    console.log('attack')
    scene.time.delayedCall(100, () => {
      this.stateMachine.transition(this.stateMachine.previous_state)
    })
  }

  execute(scene: Phaser.Scene, hero: Hero): void {}
}
