import { State } from '../../../../plugins/state-machine/types'
import { Hero } from '../hero'

export class IdleState extends State {
  enter(scene: Phaser.Scene, hero: Hero): void {
    if (hero.body instanceof Phaser.Physics.Arcade.Body) {
      hero.body.setVelocityX(0)
      hero.body.setVelocityY(0)
      hero.anims.play(`${hero.config.hero}_idle`)
    }
    console.log('idle')
  }

  execute(scene: Phaser.Scene, hero: Hero): void {
    if (hero.keys.right.isDown || hero.keys.left.isDown || hero.keys.up.isDown || hero.keys.down.isDown) {
      this.stateMachine.transition('move', hero)
    }

    if (hero.keys.fire.isDown) {
      this.stateMachine.transition('attack', scene)
    }

    if (hero.keys.pause.isDown) {
      this.stateMachine.transition('pause', scene)
    }

    if (Phaser.Input.Keyboard.JustDown(hero.keys.activeItem)) {
      this.stateMachine.transition('activeItem', scene)
    }

    if (Phaser.Input.Keyboard.JustDown(hero.keys.supportItem)) {
      this.stateMachine.transition('supportItem', scene)
    }
  }
}
