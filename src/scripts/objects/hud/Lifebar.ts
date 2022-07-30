import { HEART } from '../../constants'
import { Heart } from './Heart'
import { emitter } from '../../utils/events'

export class Lifebar extends Phaser.GameObjects.Container {
  grid: Phaser.GameObjects.GameObject[]
  constructor(scene: Phaser.Scene, x: number, y: number, life: { heart: number; extra: number; max: number }) {
    super(scene, x, y)
    this.maxSize = life.max / 2
    this.scene.add.existing(this)
    this.generate(life.heart, life.extra)

    emitter.on('damage', (cost: number, isExtra: boolean) => this.damage(cost, isExtra), this)
    emitter.on('heal', (cost: number, isExtra: boolean) => this.heal(cost, isExtra), this)
    emitter.on('health_up', (isExtra: boolean) => this.health_up(isExtra), this)
    emitter.on('health_down', (isExtra: boolean) => this.health_down(isExtra), this)
  }

  generate(heart: number, extra: number) {
    for (let i = 2; i <= heart + extra; i += 2) {
      const isExtra = i > heart
      this.health_up(isExtra)
    }
  }

  update(time: number, delta: number): void {
    this.grid = Phaser.Actions.GridAlign(this.list, {
      width: 5,
      height: 2,
      cellWidth: 30,
      cellHeight: 25,
      position: Phaser.Display.Align.TOP_LEFT,
      x: 30,
      y: 20
    })
  }

  health_up(isExtra: boolean) {
    if (this.length === this.maxSize && !isExtra) this.health_down(true)
    if (this.length === this.maxSize) return

    const heart = new Heart(this.scene, -30, -20, isExtra)
    if (isExtra) {
      const first_extra = this.getFirst('isExtra', isExtra)
      if (first_extra) {
        this.addAt(heart, this.getIndex(first_extra))
      } else {
        this.add(heart)
      }
    } else this.addAt(heart, 0)

    emitter.emit('total_of_heart', this.totalOfLife())
  }

  health_down(isExtra: boolean) {
    const last_heart = this.getAll('isExtra', isExtra).at(-1)
    if (last_heart) {
      this.removeAt(this.getIndex(last_heart), true)
    }
    emitter.emit('total_of_heart', this.totalOfLife())
  }

  heal(cost: number = 1, isExtra: boolean = false) {
    let first_heart = this.first as Heart
    while (first_heart.isExtra !== isExtra || first_heart.state === HEART.FULL) {
      first_heart = this.next as Heart
      if (!first_heart) return
    }
    first_heart.increaseState(cost)

    emitter.emit('total_of_heart', this.totalOfLife())
  }

  damage(cost: number = 1, isExtra: boolean = false) {
    let last_heart = this.last as Heart
    while (last_heart.isExtra !== isExtra || last_heart.isEmpty()) {
      last_heart = this.previous as Heart
      if (!last_heart) return
    }
    last_heart.decreaseState(cost)
    if (last_heart.isEmpty() && last_heart.isExtra) this.health_down(true)

    emitter.emit('total_of_heart', this.totalOfLife())
  }

  totalOfLife() {
    return {
      heart: (this.getAll('isExtra', false) as Heart[]).reduce((acc, cur) => acc + cur.state, 0),
      extra: (this.getAll('isExtra', true) as Heart[]).reduce((acc, cur) => acc + cur.state, 0)
    }
  }
}