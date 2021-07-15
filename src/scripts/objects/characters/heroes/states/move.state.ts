import { State } from '../../../../plugins/state-machine/types'
import { Hero } from '../hero'

export class MoveState extends State {
  enter(scene: Phaser.Scene, hero: Hero): void {
    console.log('move')
  }

  execute(scene: Phaser.Scene, hero: Hero): void {
    if (Phaser.Input.Keyboard.JustDown(hero.keys.activeItem)) {
      this.stateMachine.transition('activeItem', scene, hero)
    }

    if (Phaser.Input.Keyboard.JustDown(hero.keys.supportItem)) {
      this.stateMachine.transition('supportItem', scene, hero)
    }

    if (hero.keys.fire.isDown) {
      this.stateMachine.transition('attack', scene, hero)
    }
    if (hero.keys.right.isDown || hero.keys.left.isDown || hero.keys.up.isDown || hero.keys.down.isDown) {
      hero.anims.play(`${hero.config.hero}_run`, true)
      if (hero.body instanceof Phaser.Physics.Arcade.Body) {
        if (hero.keys.right.isDown) {
          hero.setFlipX(false)
          hero.body.setVelocityX(hero.speed)
        } else if (hero.keys.left.isDown) {
          hero.setFlipX(true)
          hero.body.setVelocityX(-hero.speed)
        } else {
          hero.body.setVelocityX(0)
        }

        if (hero.keys.up.isDown) {
          hero.body.setVelocityY(-hero.speed)
        } else if (hero.keys.down.isDown) {
          hero.body.setVelocityY(hero.speed)
        } else {
          hero.body.setVelocityY(0)
        }

        hero.body.velocity.normalize()
      }
    } else {
      this.stateMachine.transition('idle')
    }
  }
}
