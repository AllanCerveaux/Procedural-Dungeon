import Player from '@objects/player/Player'

export class Wizard extends Player {
  constructor(scene: Phaser.Scene, x: number, y: number, gender: string) {
    const name: string = `wizzard_${gender}`
    
    super(scene, x, y, { key: 'characters', name })
    
    this.life.setLife({heart: 6, extra: 2, max: 20})
    this.statistics.setStatistic({strength: 200, attack_speed: 180, attack_distance: 100, luck: 1, max_speed: 100})
  }
}
