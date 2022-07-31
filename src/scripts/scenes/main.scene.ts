import { DEFAULT_HEIGHT, DEFAULT_WIDTH, OVERLAY, SCENES } from '@constants'

import { FPSText } from '@objects/debug'
import { HUDScene } from './overlay/hud.scene'
import { Knight } from '@objects/heroes/Knight'
import { emitter } from '../utils/events'

export class MainScene extends Phaser.Scene {
  hud: Phaser.Scene
  fpsText: Phaser.GameObjects.Text
  player: Knight
  text: Phaser.GameObjects.Text
  constructor() {
    super({ key: SCENES.MAIN })
  }

  create() {
    this.player = new Knight(this, DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2, 'f')
    this.fpsText = new FPSText(this)

    this.cameras.main.setZoom(2)
    this.cameras.main.startFollow(this.player)

    this.hud = this.scene.add(OVERLAY.HUD, HUDScene, true, { life: this.player.life })

    emitter.on('game_over', () => {
      this.hud.scene.remove()
      this.scene.restart()
    })
  }

  update(time: number, delta: number): void {
    this.fpsText.update()
    this.player.update(time, delta)
  }
}
