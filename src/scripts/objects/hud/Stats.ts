import {PlayerStatistic} from "@objects/player/type";
import {DEFAULT_HEIGHT} from "@constants";
import {PlayerEmitter} from "@utils/events";
import Statistic from "@objects/hud/Statistic";

export enum STATS_EMITTER {
  STATS_CHANGE = 'STATS_CHANGE'  
}

export default class Stats extends Phaser.GameObjects.Container {
  grid: Phaser.GameObjects.GameObject[]
  constructor(scene: Phaser.Scene, x: number, y: number, {attack_cost, attack_speed, defense_cost, speed, luck}: PlayerStatistic) {
    super(scene, x, y)
    this.scene.add.existing(this)
    this.generate({attack_cost, attack_speed, defense_cost, speed, luck})
    PlayerEmitter.on(STATS_EMITTER.STATS_CHANGE, this.stateChange)
  }
  
  update() {
    this.grid = Phaser.Actions.GridAlign(this.list, {
      width: 1,
      height: 5,
      cellHeight: 40,
      position: Phaser.Display.Align.LEFT_CENTER,
      x: 30,
      y: DEFAULT_HEIGHT / 3
    })
  }
  
  generate(stats) {
    Object.keys(stats).forEach((name) => {
      const text = new Statistic(this.scene, -20, -50, '', {}, name, stats[name] / 100)
      this.add(text)
    })
  }
  
  stateChange = (state: 'up' | 'down', name: string, value: number) => {
    const stat = this.getFirst('statName', name) as Statistic
    stat.setText(`${name}: ${value / 100}`)
  }
}
