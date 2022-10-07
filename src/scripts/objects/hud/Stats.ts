import {DEFAULT_HEIGHT} from "@constants";
import {PlayerEmitter} from "@utils/events";
import Statistic from "@objects/hud/Statistic";
import {StatisticBase} from "@objects/entities/Statistics";

export enum STATS_EMITTER {
  STATS_CHANGE = 'STATS_CHANGE'  
}

export default class Stats extends Phaser.GameObjects.Container {
  grid: Phaser.GameObjects.GameObject[]
  constructor(scene: Phaser.Scene, x: number, y: number, {strength, attack_speed, attack_distance, max_speed, luck}: StatisticBase) {
    super(scene, x, y)
    this.scene.add.existing(this)
    this.generate({strength, attack_speed, attack_distance, max_speed, luck})
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
      const text = new Statistic(this.scene, -20, -50, '', {}, name, stats[name])
      this.add(text)
    })
  }
  
  stateChange = (state: 'up' | 'down', name: string, cost: number) => {
    const stat = this.getFirst('statName', name) as Statistic
    
    if(state === 'up') (stat.value as number) += cost;
    else (stat.value as number) -= cost;
    
    stat.setText(`${name}: ${stat.value as number / 100}`)
  }
}
