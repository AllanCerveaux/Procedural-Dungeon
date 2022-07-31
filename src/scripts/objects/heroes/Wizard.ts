import Player from '@objects/player/Player'

export class Wizard extends Player {
  constructor(scene: Phaser.Scene, x: number, y: number, gender: string) {
    const name: string = `wizzard_${gender}`
    const max_speed: number = 200

    super(scene, x, y, { key: 'characters', name, max_speed })

    this.life.heart = 6
    this.life.extra = 2
    this.speed = 100
    this.attack_cost = 2
    this.attack_speed = 1800
    this.defense_cost = 1
  }
}
