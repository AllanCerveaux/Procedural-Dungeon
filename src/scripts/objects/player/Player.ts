import { PlayerEmitter } from '@utils/events'
import { PLAYER_EMITTER } from "@objects/player/type";
import {STATS_EMITTER} from "@objects/hud/Stats";
import Base from "@objects/entities/Base";
import {LifeDamageOrHealType} from "@objects/entities/Life";

export default class Player extends Base {
  constructor(scene: Phaser.Scene, x: number, y: number, { key, name, max_speed }: { key: string; name: string; max_speed: number }) {
    super(scene, x, y, {key, name, max_speed, type: 'player'})
    
    PlayerEmitter.on(PLAYER_EMITTER.DAMAGE, (cost: number, isExtra: boolean) => this.hit(cost, isExtra ? 'extra' : 'heal'))
    PlayerEmitter.on(PLAYER_EMITTER.HEAL, (cost: number, isExtra: boolean) => this.heal(cost, isExtra ? 'extra' : 'heal'))
    PlayerEmitter.on(PLAYER_EMITTER.HEALTH_UP, (type: LifeDamageOrHealType) => this.life.increase(type, 2))
    PlayerEmitter.on(PLAYER_EMITTER.HEALTH_DOWN, (type: LifeDamageOrHealType) => this.life.decrease(type, 2))
    PlayerEmitter.on(STATS_EMITTER.STATS_CHANGE, (state, name, cost) => {
      console.log(state, name, cost)
      this.updateStatistic(state, name, cost)
    })
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta)
    if ((this.life.heart + this.life.extra) < 1) this.game_over()
  }
  
  game_over() {
    PlayerEmitter.emit('game_over')
  }
}
