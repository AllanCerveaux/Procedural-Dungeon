import { DEFAULT_INPUT_KEYS } from '@constants'
import { Dic } from '@types'
import { Effect } from './type'
import { MainScene } from '@scenes/main.scene'

export default class Base extends Phaser.GameObjects.Sprite {
  declare scene: MainScene
  declare body: Phaser.Physics.Arcade.Body
  keys: Dic<Phaser.Input.Keyboard.Key>

  name: string
  speed: number
  max_speed: number
  life: {
    heart: number
    max: number
    extra: number
  }

  attack_cost: number
  attack_speed: number
  defense_cost: number
  luck: number
  effect: Effect[]

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    { key, name, max_speed = 200 }: { key: string; name: string; max_speed?: number }
  ) {
    super(scene, x, y, key)

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setFrame(`${this.name}_idle_anim_f0`)
    this.anims.play(`${this.name}_idle`)
    this.keys = this.scene.input.keyboard.addKeys(DEFAULT_INPUT_KEYS) as Dic<Phaser.Input.Keyboard.Key>

    this.body.setCollideWorldBounds(true)
    this.body.setMaxSpeed(max_speed)
    this.body.setDamping(true)
    this.body.setSize(this.body.halfWidth / 2, this.body.halfHeight / 1.5).setOffset(this.body.halfWidth, 14)

    this.name = name
    this.life = {
      heart: 6,
      max: 20,
      extra: 0
    }
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta)

    if (this.speed > this.body.maxSpeed) this.speed = this.body.maxSpeed

    const horizontal_axe = this.keys.left.isDown ? -1 : this.keys.right.isDown ? 1 : 0
    const vertical_axe = this.keys.up.isDown ? -1 : this.keys.down.isDown ? 1 : 0

    if (this.body.moves) {
      if (horizontal_axe === 0 && vertical_axe === 0) {
        this.body.setAcceleration(0, 0)
        this.body.setDrag(1 / 1000, 1 / 1000)
        this.anims.play(`${this.name}_idle`, true)
      } else {
        horizontal_axe < 0 ? (this.flipX = true) : (this.flipX = false)
        this.anims.play(`${this.name}_run`, true)
      }
    }

    this.body.setAcceleration(horizontal_axe * (this.speed * 0.25) * delta, vertical_axe * (this.speed * 0.25) * delta)
  }

  knockback(force: number = 100) {
    if (this.body.facing === 13 || this.body.facing === 14) {
      this.body.velocity.x = this.flipX ? force : -1 * force
    } else if (this.body.facing === 11 || this.body.facing === 12) {
      this.body.velocity.y = this.body.facing === 11 ? force : -1 * force
    }
  }
  
  hit(cost: number, damage_type: 'extra' | 'heart') {
    this.anims.play(`${this.name}_hit`, true)
    this.setTint(0xff0000)
    this.knockback()
    this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        this.clearTint()
      }
    })
    this.life[damage_type] -= cost
  }
  
  heal(cost: number, heal_type: 'extra' | 'heart') {
    if(this.life[heal_type] <= this.life.max)  this.life[heal_type] += cost
  }

  freeze(value: boolean = false) {
    this.body.moves = value
  }
}
