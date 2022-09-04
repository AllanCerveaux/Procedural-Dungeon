import Player from '@objects/player/Player'

export class Knight extends Player {
  constructor(scene: Phaser.Scene, x: number, y: number, gender: string) {
    const name: string = `knight_${gender}`
    const max_speed: number = 200

    super(scene, x, y, { key: 'characters', name, max_speed })
    this.life.heart = 8
    this.life.extra = 0
    this.speed = 130
    this.attack_cost = 200
    this.attack_speed = 180
    this.defense_cost = 100
    this.luck = 0
  }
}
