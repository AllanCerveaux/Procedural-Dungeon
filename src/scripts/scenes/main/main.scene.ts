import { Hero } from '../../objects/characters'
import { FpsText } from '../../objects/debug'

export class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.fpsText = new FpsText(this)
    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24',
      })
      .setOrigin(1, 0)

    const player: Hero = new Hero(this, this.cameras.main.width / 2, this.cameras.main.height / 2, {
      key: 'characters',
      hero: 'knight_f',
    })

    this.cameras.main.setZoom(2)
    this.cameras.main.startFollow(player)
  }

  update() {
    this.fpsText.update()
  }
}
