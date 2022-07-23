import { DEFAULT_INPUT_KEYS } from '../../constants'
import { Dic } from '@types'

export default class Base extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body
  keys: Dic<Phaser.Input.Keyboard.Key>
  speed: number

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key)
    scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.keys = this.scene.input.keyboard.addKeys(DEFAULT_INPUT_KEYS) as Dic<Phaser.Input.Keyboard.Key>

    this.body.setCollideWorldBounds(true)
    this.body.setMaxSpeed(300)
    this.body.setDamping(true)
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta)
    const horizontal_axe = this.keys.left.isDown ? -1 : this.keys.right.isDown ? 1 : 0
    const vertical_axe = this.keys.up.isDown ? -1 : this.keys.down.isDown ? 1 : 0

    if (horizontal_axe === 0 && vertical_axe === 0) {
      this.body.setAcceleration(0, 0)
      this.body.setDrag(1 / 1000, 1 / 1000)
    }
    this.body.setAcceleration(
      horizontal_axe * (this.body.maxSpeed * 0.25) * delta,
      vertical_axe * (this.body.maxSpeed * 0.25) * delta
    )
  }
}
