import { HEART } from '@constants'
import { Heart } from './Heart'
import { PlayerEmitter } from '@utils/events'
import {PLAYER_EMITTER} from "@objects/player/type";

export enum LIFEBAR_EMITTER {
  DAMAGE = "LIFEBAR_DAMAGE",
  HEAL = "LIFEBAR_HEAL",
  HEALTH_UP = "LIFEBAR_HEALTH_UP", 
  HEALTH_DOWN = "LIFEBAR_HEALTH_DOWN",
}

export class Lifebar extends Phaser.GameObjects.Container {
  grid: Phaser.GameObjects.GameObject[]
  constructor(scene: Phaser.Scene, x: number, y: number, life: { heart: number; extra: number; max: number }) {
    super(scene, x, y)
    this.maxSize = life.max / 2
    this.scene.add.existing(this)
    this.generate(life.heart, life.extra)

    PlayerEmitter.on(PLAYER_EMITTER.DAMAGE, (cost: number, type: string) => {
      const isExtra = type === 'extra'
      this.damage(cost, isExtra)
    }, this)
    PlayerEmitter.on(PLAYER_EMITTER.HEAL, (cost: number, type: string) => {
      const isExtra = type === 'extra'
      this.heal(cost, isExtra)
    }, this)
    PlayerEmitter.on(PLAYER_EMITTER.HEALTH_UP, (type: string) => {
      const isExtra = type === 'extra'
      this.health_up(isExtra)
    }, this)
    PlayerEmitter.on(PLAYER_EMITTER.HEALTH_DOWN, (type: string) => {
      const isExtra = type === 'extra'
      this.health_down(isExtra)
    }, this)
  }

  generate(heart: number, extra: number) {
    for (let i = 2; i <= heart + extra; i += 2) {
      const isExtra = i > heart
      this.health_up(isExtra, 'generate')
    }
  }

  update() {
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

  /**
   * @TODO: Find better way to send event at generation of lifebar
   */
  health_up(isExtra: boolean, state?: string) {
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

    // if (state !== 'generate') PlayerEmitter.emit(PLAYER_EMITTER.HEALTH_UP, isExtra ? 'extra' : 'heart')

  }

  health_down(isExtra: boolean) {
    const last_heart = this.getAll('isExtra', isExtra).at(-1)
    if (last_heart) {
      this.removeAt(this.getIndex(last_heart), true)
    }
  }

  heal(cost: number = 1, isExtra: boolean = false) {
    let first_heart = this.first as Heart
    while (first_heart.isExtra !== isExtra || first_heart.state === HEART.FULL) {
      first_heart = this.next as Heart
      if (!first_heart) return
    }
    first_heart.increaseState(cost)
  }

  damage(cost: number = 1, isExtra: boolean = false) {
    let last_heart = this.last as Heart
    while (last_heart.isExtra !== isExtra || last_heart.isEmpty()) {
      last_heart = this.previous as Heart
      if (!last_heart) return
    }
    last_heart.decreaseState(cost)
    if (last_heart.isEmpty() && last_heart.isExtra) this.health_down(true)
  }
}
