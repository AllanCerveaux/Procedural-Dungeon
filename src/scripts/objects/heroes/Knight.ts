import Base from '@objects/player/Base'

export class Knight extends Base {
  constructor(scene: Phaser.Scene, x: number, y: number, gender: string) {
    const name: string = `knight_${gender}`
    const max_speed: number = 200

    super(scene, x, y, { key: 'characters', name, max_speed })
    this.life.heart = 8
    this.life.extra = 0
    this.speed = 130
    this.attack_cost = 2
    this.attack_speed = 1800
    this.defense_cost = 1
  }
}
