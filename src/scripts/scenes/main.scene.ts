import { DEFAULT_HEIGHT, DEFAULT_WIDTH, SCENES } from '@constants'

import Base from '@game/objects/player/Base'
import { FPSText } from '@objects/debug'

export class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  player: Phaser.GameObjects.Sprite
  constructor() {
    super({ key: SCENES.MAIN })
  }

  create() {
    this.fpsText = new FPSText(this)
    this.player = new Base(this, DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2, { key: 'characters', name: 'knight_f' })
  }

  update(time: number, delta: number): void {
    this.fpsText.update()
    this.player.update(time, delta)
  }
}
