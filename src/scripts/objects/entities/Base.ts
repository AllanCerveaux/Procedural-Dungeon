import {MainScene} from "@scenes/main.scene";
import {Life, LifeDamageOrHealType} from "@objects/entities/Life";
import {Statistics} from "@objects/entities/Statistics";
import {Control} from "@objects/entities/Control";

export type BaseOptions = {
  key: string;
  name: string;
  max_speed: number;
  type: 'enemy' | 'player'
}

export default class Base extends Phaser.GameObjects.Sprite{
  declare scene: MainScene
  declare body: Phaser.Physics.Arcade.Body;
  
  life: Life
  statistics: Statistics
  control: Control
  
  entity_type: BaseOptions['type']
  speed: number
  
  protected constructor(scene: Phaser.Scene, x: number, y: number, { key, name, max_speed = 100, type }: BaseOptions) {
    super(scene, x, y, key)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setFrame(`${this.name}_idle_anim_f0`)
    this.anims.play(`${this.name}_idle`)
    
    this.name = name
    this.entity_type = type
    
    this.life = new Life()
    this.statistics = new Statistics()
    this.control = new Control(this.scene)
    
    this.body.setCollideWorldBounds(true)
    this.body.setMaxSpeed(this.statistics.max_speed)
    this.body.setDamping(true)
    this.body.setSize(this.body.halfWidth / 2, this.body.halfHeight / 1.5).setOffset(this.body.halfWidth, 14)
  }
  
  protected preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)
    
    this.control.update()
    
    if(this.speed > this.body.maxSpeed) this.speed = this.body.maxSpeed
    
    if(this.body.moves) {
      if(this.control.horizontal_axe === 0 && this.control.vertical_axe === 0) {
        this.body.setAcceleration(0, 0)
        this.body.setDrag(1 / 1000, 1 / 1000)
        this.anims.play(`${this.name}_idle`, true)
      } else {
        this.control.horizontal_axe < 0 ? (this.flipX = true) : (this.flipX = false)
        this.anims.play(`${this.name}_run`, true)
      }
    }

    this.body.setAcceleration(this.control.horizontal_axe * (this.speed * 0.25) * delta, this.control.vertical_axe * (this.speed * 0.25) * delta)
  }

  knockback(force: number = 100) {
    if (this.body.facing === 13 || this.body.facing === 14) {
      this.body.velocity.x = this.flipX ? force : -1 * force
    } else if (this.body.facing === 11 || this.body.facing === 12) {
      this.body.velocity.y = this.body.facing === 11 ? force : -1 * force
    }
  }
  
  hit(cost: number, damage_type: LifeDamageOrHealType) {
    this.anims.play(`${this.name}_hit`, true)
    this.setTint(0xff0000)
    this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        this.clearTint()
      }
    })
    
    this.life.decrease(damage_type, cost)
  }
  
  heal(cost: number, heal_type: LifeDamageOrHealType) {
    this.life.increase(heal_type, cost)
  }
  
  updateStatistic(state, name, cost) {
    if(state === 'UP') this.statistics.increase(name, cost)
    else this.statistics.decrease(name, cost)
    console.log(this.statistics)
  }
  
  freeze(value: boolean = false) {
    this.body.moves = value
  }
}
