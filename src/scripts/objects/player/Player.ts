import Base from './Base'
import { emitter } from '@utils/events'

export default class Player extends Base {
  constructor(scene, x, y, { key, name, max_speed }: { key: string; name: string; max_speed: number }) {
    super(scene, x, y, { key, name, max_speed })
    this.name = name
    this.max_speed = max_speed

    emitter.on('total_of_heart', ({ heart, extra }: { heart: number; extra: number }) => {
      this.life.heart = heart
      this.life.extra = extra
    })
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta)
    if (this.life.heart < 1 && this.life.extra < 1) this.die()
  }

  hit(cost: number) {
    this.anims.play(`${this.name}_hit`, true)
    this.setTint(0xff0000)
    this.knockback()
    this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        this.clearTint()
      }
    })

    const isExtra = this.life.extra > 0

    emitter.emit('damage', cost, isExtra)
  }

  die() {
    this.knockback(1000)
    this.scene.time.addEvent({
      delay: 200,
      callback: () => {
        this.freeze()
        this.anims.stop()
      }
    })
    emitter.emit('game_over')
  }
}
