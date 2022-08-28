import Base from './Base'
import { PlayerEmitter } from '@utils/events'
import { PLAYER_EMITTER } from "@objects/player/type";
import { LIFEBAR_EMITTER } from "@objects/hud/Lifebar";

export default class Player extends Base {
  constructor(scene: Phaser.Scene, x: number, y: number, { key, name, max_speed }: { key: string; name: string; max_speed: number }) {
    super(scene, x, y, { key, name, max_speed })
    this.name = name
    this.max_speed = max_speed
    
    PlayerEmitter.on(PLAYER_EMITTER.DAMAGE, (cost: number, isExtra: boolean) => this.hit(cost, isExtra ? 'extra' : 'heart'))
    PlayerEmitter.on(PLAYER_EMITTER.HEAL, (cost: number, isExtra: boolean) => this.heal(cost, isExtra ? 'extra' : 'heart'))
    PlayerEmitter.on(PLAYER_EMITTER.HEALTH_UP, (type: 'extra' | 'heart') => this.life[type] += 2)
    PlayerEmitter.on(PLAYER_EMITTER.HEALTH_DOWN, (type: 'extra' | 'heart') => this.life[type] -= 2)
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta)
    if ((this.life.heart + this.life.extra) < 1) this.game_over()
  }

  take_damage(cost: number, damage_type: 'extra' | 'heart') {
    PlayerEmitter.emit(LIFEBAR_EMITTER.DAMAGE, cost, damage_type === 'extra')
  }
  
  take_heal(cost: number, heal_type: 'extra' | 'heart') {
    PlayerEmitter.emit(LIFEBAR_EMITTER.HEAL, cost, heal_type === 'extra')
  }
  
  health_up(isExtra: boolean) {
    PlayerEmitter.emit(LIFEBAR_EMITTER.HEALTH_UP, isExtra)
  }
  
  health_down(isExtra: boolean) {
    PlayerEmitter.emit(LIFEBAR_EMITTER.HEALTH_DOWN, isExtra)
  }
  
  game_over() {
    PlayerEmitter.emit('game_over')
  }
}
